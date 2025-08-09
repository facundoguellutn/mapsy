import { z } from 'zod';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getToken } from './storage';

function deriveHostFromExpo(): string | null {
  try {
    // Try to infer the dev server host when running in Expo Go / dev builds
    const expoConfig: any = (Constants as any).expoConfig ?? (Constants as any).manifest ?? (Constants as any).manifest2;
    const possibleHosts: Array<string | undefined> = [
      expoConfig?.hostUri,
      expoConfig?.debuggerHost,
      expoConfig?.extra?.expoGo?.developer?.host,
      expoConfig?.extra?.expoGo?.debuggerHost,
    ];
    const hostWithPort = possibleHosts.find(Boolean);
    if (!hostWithPort) return null;
    const host = String(hostWithPort).split(':')[0];
    if (!host) return null;
    if (Platform.OS === 'android' && (host === 'localhost' || host === '127.0.0.1')) {
      return '10.0.2.2';
    }
    return host;
  } catch {
    return null;
  }
}

function resolveApiBaseUrl(): string {
  // 1. Check explicit environment variable (for production/custom setups)
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, '');
  }
  
  // 2. In production builds, we need explicit configuration
  if (!__DEV__) {
    throw new Error(
      'EXPO_PUBLIC_API_URL environment variable is required for production builds. ' +
      'Set it to your API server URL (e.g., https://your-api.com)'
    );
  }
  
  // 3. Development: try to auto-detect from Expo dev server
  const host = deriveHostFromExpo();
  if (host) {
    return `http://${host}:3000`;
  }
  
  // 4. Development fallbacks by platform
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000'; // Android emulator
  }
  
  return 'http://localhost:3000'; // iOS Simulator, web, etc.
}

const API_BASE_URL = resolveApiBaseUrl();

// Debug logging (only log once)
if (__DEV__) {
  console.log('🔧 API_BASE_URL resolved to:', API_BASE_URL);
  console.log('🔧 Platform:', Platform.OS);
  console.log('🔧 __DEV__:', __DEV__);
  console.log('🔧 Constants.expoConfig:', (Constants as any).expoConfig);
}

// Zod schemas for validation (matching backend)
export const RegisterSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

export const LoginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(1, 'Password is required')
});

export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  code?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    preferences: {
      language: 'es' | 'en' | 'fr' | 'de' | 'pt';
      theme: 'light' | 'dark' | 'system';
    };
    onboardingCompleted: boolean;
    createdAt: string;
    lastLogin?: string;
  };
}

// HTTP client with auth
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Debug logging
    if (__DEV__) {
      console.log(`🌐 API ${options.method || 'GET'} ${endpoint} -> ${url}`);
      console.log('🌐 Headers:', headers);
      if (options.body) {
        console.log('🌐 Body:', options.body);
      }
    }
    
    const token = await getToken();
    const mergedFromOptions =
      options.headers instanceof Headers
        ? Object.fromEntries(options.headers.entries())
        : (options.headers as Record<string, string> | undefined);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(mergedFromOptions ?? {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (__DEV__) {
        console.log(`🌐 Response: ${response.status} ${response.statusText}`);
        console.log('🌐 Response headers:', Object.fromEntries(response.headers.entries()));
      }

      let data: any = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        // best-effort parse
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        const message = data?.message || `Error ${response.status}`;
        throw new ApiError(message, response.status, data);
      }

      return (data ?? { success: true, message: 'OK' }) as ApiResponse<T>;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error?.name === 'AbortError') {
        throw new ApiError('Tiempo de espera agotado al contactar el servidor', 408);
      }
      if (__DEV__) {
        console.error('🚨 API request failed:', error);
        console.error('🚨 Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          url: url
        });
      }
      throw new ApiError(
        'No se pudo conectar con el servidor. Verifica tu conexión y que el backend esté activo.',
        503
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    // Validate on client side
    RegisterSchema.parse(data);
    
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    // Validate on client side
    LoginSchema.parse(data);
    
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe(): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.request<{ user: AuthResponse['user'] }>('/auth/me');
  }

  async updateOnboarding(completed: boolean): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.request<{ user: AuthResponse['user'] }>('/auth/onboarding', {
      method: 'PATCH',
      body: JSON.stringify({ onboardingCompleted: completed }),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Health check endpoint for debugging connectivity
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health', {
      method: 'GET',
    });
  }
}

// Custom API Error class
export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }

  get isAuthError(): boolean {
    return this.status === 401;
  }

  get isValidationError(): boolean {
    return this.status === 400;
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);
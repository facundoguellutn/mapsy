import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { api, ApiError, LoginData, RegisterData } from '@/lib/api';
import { User, storeToken, storeUser, getToken, getUser, clearAuthData } from '@/lib/storage';

// Auth State
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_INITIALIZE'; payload: { user: User | null } }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Auth Context
interface AuthContextType {
  state: AuthState;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateOnboarding: (completed: boolean) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };

    case 'AUTH_INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isInitialized: true,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isInitialized: false,
  error: null,
};

// Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = await getToken();
      if (!token) {
        dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null } });
        return;
      }

      // Verify token by fetching user data
      const response = await api.getMe();
      if (response.success && response.data) {
        await storeUser(response.data.user);
        dispatch({ type: 'AUTH_INITIALIZE', payload: { user: response.data.user } });
      } else {
        // Token is invalid, clear stored data
        await clearAuthData();
        dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null } });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear potentially corrupted data
      await clearAuthData();
      dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null } });
    }
  };

  const login = async (data: LoginData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await api.login(data);
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        
        // Store auth data
        await Promise.all([
          storeToken(token),
          storeUser(user)
        ]);
        
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      let message = 'No se pudo iniciar sesión. Intenta nuevamente.';
      if (error instanceof ApiError) {
        if (error.isValidationError && error.data?.errors?.length) {
          message = error.data.errors.map((e: any) => `${e.field}: ${e.message}`).join('\n');
        } else if (error.isAuthError) {
          message = 'Email o contraseña inválidos.';
        } else {
          message = error.message;
        }
      }
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      console.log('🔵 Starting registration process...');
      dispatch({ type: 'AUTH_START' });
      
      const response = await api.register(data);
      console.log('🔵 Registration API response:', response);
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        console.log('🟢 Registration successful, storing auth data...');
        console.log('🟢 User data:', user);
        
        // Store auth data
        await Promise.all([
          storeToken(token),
          storeUser(user)
        ]);
        
        console.log('🟢 Auth data stored, dispatching AUTH_SUCCESS...');
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        console.log('🟢 Registration complete!');
      } else {
        console.log('🔴 Registration failed - no success or data in response');
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.log('🔴 Registration error:', error);
      let message = 'No se pudo crear la cuenta. Intenta nuevamente.';
      if (error instanceof ApiError) {
        console.log('🔴 ApiError details:', { status: error.status, data: error.data });
        if (error.isValidationError && error.data?.errors?.length) {
          message = error.data.errors.map((e: any) => `${e.field}: ${e.message}`).join('\n');
        } else if (error.status === 409) {
          message = 'Ya existe un usuario con ese email.';
        } else if (error.status === 401 || error.status === 403) {
          message = 'No autorizado. Verifica tus datos.';
        } else {
          message = error.message;
        }
      }
      console.log('🔴 Final error message:', message);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (optional)
      try {
        await api.logout();
      } catch (error) {
        // Ignore logout API errors, still clear local data
        console.warn('Logout API call failed:', error);
      }
      
      // Clear local data
      await clearAuthData();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if clearing fails, dispatch logout
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const updateOnboarding = async (completed: boolean) => {
    try {
      const response = await api.updateOnboarding(completed);
      
      if (response.success && response.data) {
        await storeUser(response.data.user);
        dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      } else {
        throw new Error(response.message || 'Failed to update onboarding status');
      }
    } catch (error) {
      const message = error instanceof ApiError 
        ? error.message 
        : 'Failed to update onboarding status';
      
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateOnboarding,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
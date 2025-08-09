import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'mapsy_auth_token';
const USER_KEY = 'mapsy_user_data';

export interface User {
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
}

// Token storage
export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
    throw new Error('Failed to store authentication token');
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// User data storage
export const storeUser = async (user: User): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user:', error);
    throw new Error('Failed to store user data');
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await SecureStore.getItemAsync(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

// Clear all auth data
export const clearAuthData = async (): Promise<void> => {
  await Promise.all([
    removeToken(),
    removeUser()
  ]);
};
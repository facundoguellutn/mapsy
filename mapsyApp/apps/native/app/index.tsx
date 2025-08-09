import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function IndexScreen() {
  const { state } = useAuth();
  const { user, isLoading, isInitialized } = state;

  console.log('🏠 Index screen render - state:', { 
    user: user ? { id: user.id, email: user.email, onboardingCompleted: user.onboardingCompleted } : null, 
    isLoading, 
    isInitialized 
  });

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    console.log('🏠 Showing loading screen...');
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-foreground mt-4 text-lg">Inicializando Mapsy...</Text>
      </View>
    );
  }

  // If no user, redirect to auth
  if (!user) {
    console.log('🏠 No user found, redirecting to login...');
    return <Redirect href="/(auth)/login" />;
  }

  // If user hasn't completed onboarding, redirect to onboarding
  if (!user.onboardingCompleted) {
    console.log('🏠 User found but onboarding not completed, redirecting to onboarding...');
    return <Redirect href="/(onboarding)/welcome" />;
  }

  // User is authenticated and onboarded, show main app
  console.log('🏠 User authenticated and onboarded, redirecting to home...');
  return <Redirect href="/(authenticated)/home" />;
}
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingContainer } from '@/components/OnboardingContainer';

export default function WelcomeScreen() {
  return (
    <OnboardingContainer
      currentStep={1}
      totalSteps={4}
      nextPath="/(onboarding)/features"
      showBackButton={false}
      nextButtonText="Comenzar"
    >
      <View className="flex-1 justify-center items-center px-6 py-8">
        {/* Logo/Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-6">
            <Ionicons name="map" size={48} color="white" />
          </View>
          <Text className="text-5xl font-bold text-primary mb-2">
            Mapsy
          </Text>
        </View>

        {/* Welcome Content */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-foreground text-center mb-4">
            ¡Bienvenido!
          </Text>
          <Text className="text-lg text-muted-foreground text-center leading-relaxed px-4">
            Tu guía turístico inteligente que utiliza IA para descubrir la historia 
            y cultura de cualquier lugar que visites.
          </Text>
        </View>

        {/* Illustration placeholder */}
        <View className="flex-1 justify-center items-center">
          <View className="w-56 h-56 bg-muted rounded-2xl items-center justify-center">
            <Ionicons name="camera" size={64} color="#6B7280" />
            <Text className="text-muted-foreground mt-4 text-center text-base">
              Toma una foto{'\n'}y descubre su historia
            </Text>
          </View>
        </View>
      </View>
    </OnboardingContainer>
  );
}
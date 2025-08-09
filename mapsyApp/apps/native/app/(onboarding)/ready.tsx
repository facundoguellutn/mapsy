import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingContainer } from '@/components/OnboardingContainer';

export default function ReadyScreen() {
  const { updateOnboarding } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExploring = async () => {
    try {
      console.log('🎯 Starting exploration - completing onboarding...');
      setIsLoading(true);
      await updateOnboarding(true);
      console.log('🎯 Onboarding completed, navigating to home...');
      
      // Force navigation to home (manual fallback)
      setTimeout(() => {
        router.replace('/(authenticated)/home');
      }, 500);
    } catch (error) {
      console.log('🎯 Error completing onboarding:', error);
      Alert.alert('Error', 'No se pudo completar la configuración. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <OnboardingContainer
      currentStep={4}
      totalSteps={4}
      backPath="/(onboarding)/permissions"
      showNextButton={true}
      nextButtonText={isLoading ? 'Configurando...' : 'Comenzar a Explorar'}
      nextButtonDisabled={isLoading}
      onNext={handleStartExploring}
    >
      <View className="flex-1 justify-center items-center px-6 py-8">
        {/* Success Animation/Icon */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-6">
            <Ionicons name="checkmark" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-foreground text-center mb-4">
            ¡Todo Listo!
          </Text>
          <Text className="text-base text-muted-foreground text-center leading-relaxed px-4">
            Has completado la configuración inicial.{'\n'}Ahora puedes comenzar a explorar y{'\n'}descubrir la historia detrás de cada lugar{'\n'}que visites.
          </Text>
        </View>

        {/* Features Summary */}
        <View className="w-full mb-8">
          <Text className="text-xl font-semibold text-foreground mb-4 text-center">
            Ya puedes:
          </Text>
          
          <View>
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="camera" size={18} color="#3B82F6" />
              </View>
              <Text className="text-muted-foreground flex-1 leading-relaxed text-sm">
                Tomar fotos de lugares y obtener información al instante
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="chatbubble-ellipses" size={18} color="#3B82F6" />
              </View>
              <Text className="text-muted-foreground flex-1 leading-relaxed text-sm">
                Conversar con la IA sobre historia y cultura
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="location" size={18} color="#3B82F6" />
              </View>
              <Text className="text-muted-foreground flex-1 leading-relaxed text-sm">
                Recibir recomendaciones personalizadas
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Ionicons name="heart" size={18} color="#3B82F6" />
              </View>
              <Text className="text-muted-foreground flex-1 leading-relaxed text-sm">
                Guardar tus lugares favoritos
              </Text>
            </View>
          </View>
        </View>

        {/* Welcome message */}
        <View className="items-center">
          <Text className="text-center text-sm font-medium text-muted-foreground">
            ¡Bienvenido a Mapsy! 🗺️✨
          </Text>
        </View>
      </View>
    </OnboardingContainer>
  );
}
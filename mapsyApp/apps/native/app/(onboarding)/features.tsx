import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { OnboardingContainer } from '@/components/OnboardingContainer';

interface FeatureItemProps {
  icon: any;
  title: string;
  description: string;
  color: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, color }) => (
  <View className="flex-row items-start mb-6">
    <View className={`w-12 h-12 rounded-full items-center justify-center mr-4`} style={{ backgroundColor: color }}>
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-lg font-bold text-foreground mb-2">
        {title}
      </Text>
      <Text className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </Text>
    </View>
  </View>
);

export default function FeaturesScreen() {
  return (
    <OnboardingContainer
      currentStep={2}
      totalSteps={4}
      nextPath="/(onboarding)/permissions"
      backPath="/(onboarding)/welcome"
    >
      <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-foreground text-center mb-3">
            ¿Qué puedes hacer?
          </Text>
          <Text className="text-base text-muted-foreground text-center px-4">
            Descubre todas las funcionalidades que Mapsy tiene para ti
          </Text>
        </View>

        {/* Features List */}
        <View className="mb-4">
          <FeatureItem
            icon={<Ionicons name="camera" size={24} color="white" />}
            title="Reconocimiento Visual"
            description="Toma fotos de monumentos, edificios o lugares y obtén información instantánea sobre ellos"
            color="#3B82F6"
          />

          <FeatureItem
            icon={<Ionicons name="chatbubble-ellipses" size={24} color="white" />}
            title="Chat Inteligente"
            description="Conversa con nuestra IA sobre la historia, cultura y curiosidades de cualquier lugar"
            color="#10B981"
          />

          <FeatureItem
            icon={<Ionicons name="location" size={24} color="white" />}
            title="Recomendaciones"
            description="Recibe sugerencias personalizadas de lugares cercanos según tu ubicación"
            color="#F59E0B"
          />

          <FeatureItem
            icon={<MaterialIcons name="offline-pin" size={24} color="white" />}
            title="Modo Offline"
            description="Accede a tus lugares favoritos y descubrimientos incluso sin conexión a internet"
            color="#EF4444"
          />

          <FeatureItem
            icon={<Ionicons name="language" size={24} color="white" />}
            title="Multiidioma"
            description="Información disponible en múltiples idiomas para viajeros de todo el mundo"
            color="#8B5CF6"
          />
        </View>
      </ScrollView>
    </OnboardingContainer>
  );
}
import React from 'react';
import { View, Text } from 'react-native';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <Container>
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-6">
            <Ionicons name="compass" size={48} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Explorar Lugares
          </Text>
          <Text className="text-muted-foreground text-center leading-relaxed">
            Próximamente podrás explorar lugares cercanos y descubrir sitios 
            increíbles basados en tu ubicación actual.
          </Text>
        </View>
      </View>
    </Container>
  );
}
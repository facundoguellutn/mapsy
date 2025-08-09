import React from 'react';
import { View, Text } from 'react-native';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  return (
    <Container>
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center">
          <View className="w-24 h-24 bg-red-100 rounded-full items-center justify-center mb-6">
            <Ionicons name="heart" size={48} color="#EF4444" />
          </View>
          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Tus Favoritos
          </Text>
          <Text className="text-muted-foreground text-center leading-relaxed">
            Aquí aparecerán todos los lugares que marques como favoritos. 
            ¡Comienza explorando y guarda los sitios que más te gusten!
          </Text>
        </View>
      </View>
    </Container>
  );
}
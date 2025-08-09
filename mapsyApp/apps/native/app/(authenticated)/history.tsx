import React from 'react';
import { View, Text } from 'react-native';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  return (
    <Container>
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center">
          <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center mb-6">
            <Ionicons name="time" size={48} color="#F59E0B" />
          </View>
          <Text className="text-2xl font-bold text-foreground text-center mb-4">
            Tu Historial
          </Text>
          <Text className="text-muted-foreground text-center leading-relaxed">
            Revisa todos los lugares que has visitado y las conversaciones 
            que has tenido con nuestra IA. Tu historial de descubrimientos 
            aparecerá aquí.
          </Text>
        </View>
      </View>
    </Container>
  );
}
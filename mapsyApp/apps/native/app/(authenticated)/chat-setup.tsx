import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { api } from '@/lib/api';
import paises from '@/lib/countries';

interface Country {
  name: string;
  code: string;
  flag: string;
}

export default function ChatSetupScreen() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [city, setCity] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredCountries = paises.filter((country) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    setSearchCountry('');
  };

  const handleCreateChat = async () => {
    if (!selectedCountry) {
      Alert.alert('Error', 'Por favor selecciona un país');
      return;
    }

    if (!city.trim()) {
      Alert.alert('Error', 'Por favor ingresa una ciudad');
      return;
    }

    setIsCreating(true);
    try {
      const response = await api.post('/api/chat/sessions', {
        country: selectedCountry.name,
        city: city.trim(),
      }) as any;

      if (response.success) {
        router.push({
          pathname: '/(authenticated)/chat/[sessionId]',
          params: { sessionId: response.data.session.id },
        });
      } else {
        Alert.alert('Error', 'No se pudo crear el chat');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      Alert.alert('Error', 'No se pudo crear el chat. Verifica tu conexión.');
    } finally {
      setIsCreating(false);
    }
  };

  if (showCountryList) {
    return (
      <Container>
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <TouchableOpacity
              onPress={() => setShowCountryList(false)}
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-foreground">
              Seleccionar País
            </Text>
            <View className="w-10" />
          </View>

          {/* Search */}
          <View className="p-4">
            <View className="flex-row items-center bg-card border border-border rounded-lg px-3 py-2">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                value={searchCountry}
                onChangeText={setSearchCountry}
                placeholder="Buscar país..."
                className="flex-1 ml-2 text-foreground"
                placeholderTextColor="#9CA3AF"
                autoFocus
              />
            </View>
          </View>

          {/* Countries List */}
          <ScrollView className="flex-1">
            {filteredCountries.map((country) => (
              <TouchableOpacity
                key={country.code}
                onPress={() => handleSelectCountry(country)}
                className="flex-row items-center p-4 border-b border-border/50"
              >
                <Text className="text-2xl mr-3">{country.flag ? '🌍' : '🏳️'}</Text>
                <Text className="text-lg text-foreground font-medium">
                  {country.name}
                </Text>
                {selectedCountry?.code === country.code && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#10B981"
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">
            Nuevo Chat
          </Text>
          <View className="w-10" />
        </View>

        <View className="px-6 pb-6">
          {/* Welcome Message */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
              <Ionicons name="chatbubbles" size={40} color="#3B82F6" />
            </View>
            <Text className="text-2xl font-bold text-foreground text-center mb-2">
              ¡Comienza tu aventura!
            </Text>
            <Text className="text-muted-foreground text-center leading-6">
              Cuéntame qué país y ciudad estás visitando para comenzar tu guía turístico personalizado
            </Text>
          </View>

          {/* Country Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">
              País que estás visitando
            </Text>
            <TouchableOpacity
              onPress={() => setShowCountryList(true)}
              className="bg-card border border-border rounded-lg p-4 flex-row items-center justify-between"
            >
              {selectedCountry ? (
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">🌍</Text>
                  <Text className="text-lg text-foreground font-medium">
                    {selectedCountry.name}
                  </Text>
                </View>
              ) : (
                <Text className="text-muted-foreground text-lg">
                  Seleccionar país...
                </Text>
              )}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* City Input */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-foreground mb-3">
              Ciudad que estás visitando
            </Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Ej: Buenos Aires, París, Nueva York..."
              className="bg-card border border-border rounded-lg p-4 text-lg text-foreground"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleCreateChat}
            />
            <Text className="text-sm text-muted-foreground mt-2">
              Ingresa el nombre de la ciudad que planeas explorar
            </Text>
          </View>

          {/* Create Chat Button */}
          <TouchableOpacity
            onPress={handleCreateChat}
            disabled={!selectedCountry || !city.trim() || isCreating}
            className={`rounded-lg py-4 px-6 flex-row items-center justify-center ${
              selectedCountry && city.trim() && !isCreating
                ? 'bg-primary'
                : 'bg-gray-300'
            }`}
          >
            {isCreating ? (
              <ActivityIndicator color="white" className="mr-2" />
            ) : (
              <Ionicons
                name="chatbubbles"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
            )}
            <Text className="text-white font-semibold text-lg">
              {isCreating ? 'Creando...' : 'Comenzar Chat Turístico'}
            </Text>
          </TouchableOpacity>

          {/* Info Cards */}
          <View className="mt-8 space-y-4">
            <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="camera" size={20} color="#3B82F6" />
                <Text className="text-blue-800 font-semibold ml-2">
                  Sube fotos
                </Text>
              </View>
              <Text className="text-blue-700">
                Comparte fotos de lugares y obtén información histórica y cultural detallada
              </Text>
            </View>

            <View className="bg-green-50 border border-green-200 rounded-lg p-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={20} color="#10B981" />
                <Text className="text-green-800 font-semibold ml-2">
                  Recomendaciones
                </Text>
              </View>
              <Text className="text-green-700">
                Recibe sugerencias personalizadas de lugares cercanos para visitar
              </Text>
            </View>

            <View className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="chatbubble-ellipses" size={20} color="#8B5CF6" />
                <Text className="text-purple-800 font-semibold ml-2">
                  Pregunta cualquier cosa
                </Text>
              </View>
              <Text className="text-purple-700">
                Haz preguntas sobre cultura, historia, gastronomía y más
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
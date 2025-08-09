import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { getToken } from '@/lib/storage';
import { api, API_BASE_URL } from '@/lib/api';

interface LandmarkResult {
  landmarks: Array<{
    description: string;
    locations: Array<{
      latLng: { latitude: number; longitude: number };
    }>;
    score: number;
  }>;
  webDetection?: {
    webEntities: Array<{
      description: string;
      score: number;
    }>;
    bestGuessLabels: Array<{
      label: string;
    }>;
  };
}

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<LandmarkResult | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { state } = useAuth();

  // Debug function to check auth state
  const checkAuthState = async () => {
    console.log('=== AUTH DEBUG ===');
    console.log('Context state:', {
      hasUser: !!state.user,
      userEmail: state.user?.email,
      isInitialized: state.isInitialized,
      isLoading: state.isLoading,
      error: state.error
    });
    
    const token = await getToken();
    console.log('Token from storage:', token ? `EXISTS (${token.substring(0, 20)}...)` : 'NULL');
    console.log('==================');
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo) {
        setCapturedImage(photo.uri);
        await processImage(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      console.log('Starting image processing...', imageUri);
      await checkAuthState();
      
      // Get auth token using the storage helper
      const token = await getToken();
      
      if (!token || !state.user) {
        console.log('❌ Auth verification failed');
        Alert.alert(
          'Error de Autenticación', 
          'No se pudo verificar tu sesión. Por favor cierra y abre la app nuevamente.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
        return;
      }
      console.log('✅ Auth verified, proceeding with upload...');
      
      // First, test server connectivity using the API client
      console.log('Testing server connectivity...');
      try {
        const healthCheck = await api.healthCheck();
        console.log('✅ Server health check passed:', healthCheck.success);
      } catch (healthError) {
        console.error('❌ Server connectivity test failed:', healthError);
        throw new Error('No se puede conectar al servidor. ¿Está corriendo?');
      }
      
      console.log('✅ Server is reachable, uploading image...');
      
      // Use the same base URL that the API client uses
      const url = `${API_BASE_URL}/api/vision/detect-landmark`;
      console.log('Making request to server...', url);
      console.log('Using API_BASE_URL:', API_BASE_URL);
      
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);

      console.log('Request headers:', { 'Authorization': `Bearer ${token.substring(0, 20)}...` });
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success! Results:', result);
        setResults(result);
      } else {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert(
        'Error', 
        `No se pudo procesar la imagen: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setResults(null);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Container>
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="camera-outline" size={64} color="#6B7280" />
          <Text className="text-xl font-bold text-foreground text-center mt-4 mb-2">
            Permiso de Cámara Requerido
          </Text>
          <Text className="text-muted-foreground text-center mb-6">
            Necesitamos acceso a tu cámara para poder identificar lugares y monumentos.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-primary rounded-lg px-6 py-3"
          >
            <Text className="text-white font-semibold">Conceder Permiso</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  if (capturedImage && results) {
    return (
      <Container>
        <View className="flex-1">
          {/* Image Preview */}
          <View className="flex-1">
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          </View>

          {/* Results */}
          <View className="bg-card border-t border-border p-6">
            {results.landmarks && results.landmarks.length > 0 ? (
              <View>
                <Text className="text-xl font-bold text-foreground mb-4">
                  🏛️ Lugar Detectado
                </Text>
                {results.landmarks.map((landmark, index) => (
                  <View key={index} className="mb-4">
                    <Text className="text-lg font-semibold text-foreground mb-2">
                      {landmark.description}
                    </Text>
                    <Text className="text-sm text-muted-foreground mb-2">
                      Confianza: {Math.round(landmark.score * 100)}%
                    </Text>
                    {landmark.locations && landmark.locations.length > 0 && (
                      <Text className="text-sm text-muted-foreground">
                        📍 Lat: {landmark.locations[0].latLng.latitude.toFixed(4)}, 
                        Lng: {landmark.locations[0].latLng.longitude.toFixed(4)}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            ) : results.webDetection?.bestGuessLabels && results.webDetection.bestGuessLabels.length > 0 ? (
              <View>
                <Text className="text-xl font-bold text-foreground mb-4">
                  🔍 Información Detectada
                </Text>
                {results.webDetection.bestGuessLabels.map((label, index) => (
                  <Text key={index} className="text-lg text-foreground mb-2">
                    {label.label}
                  </Text>
                ))}
              </View>
            ) : (
              <View>
                <Text className="text-xl font-bold text-foreground mb-4">
                  ❓ No se detectaron lugares conocidos
                </Text>
                <Text className="text-muted-foreground mb-4">
                  Intenta tomar una foto más clara o de un lugar más reconocible.
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            <View className="flex-row space-x-4 mt-4">
              <TouchableOpacity
                onPress={resetCamera}
                className="flex-1 border border-border rounded-lg py-3"
              >
                <Text className="text-foreground text-center font-semibold">
                  Tomar Otra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-1 bg-primary rounded-lg py-3"
              >
                <Text className="text-white text-center font-semibold">
                  Finalizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }

  if (capturedImage && isProcessing) {
    return (
      <Container>
        <View className="flex-1">
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          <View className="absolute inset-0 bg-black/50 flex-1 justify-center items-center">
            <View className="bg-white rounded-xl p-6 items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-foreground font-semibold mt-4">
                Analizando imagen...
              </Text>
              <Text className="text-muted-foreground text-center mt-2">
                Identificando lugares y monumentos
              </Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex-1">
        <CameraView 
          style={styles.camera} 
          facing={facing}
          ref={cameraRef}
        >
          {/* Camera overlay */}
          <View className="flex-1 justify-between p-6">
            {/* Top controls */}
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
              >
                <Ionicons name="camera-reverse" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View className="items-center">
              <View className="bg-black/70 rounded-xl p-4 max-w-xs">
                <Text className="text-white text-center font-medium">
                  📸 Apunta la cámara hacia un lugar, monumento o vista interesante
                </Text>
              </View>
            </View>

            {/* Bottom controls */}
            <View className="flex-row justify-center items-center space-x-8">
              <TouchableOpacity
                onPress={pickImage}
                className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
              >
                <Ionicons name="images" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={takePicture}
                className="w-20 h-20 bg-white rounded-full items-center justify-center border-4 border-white/30"
              >
                <View className="w-16 h-16 bg-white rounded-full" />
              </TouchableOpacity>
              
              <View className="w-12 h-12" />
            </View>
          </View>
        </CameraView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  capturedImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
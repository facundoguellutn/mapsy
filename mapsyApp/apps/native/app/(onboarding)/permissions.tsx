import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { OnboardingContainer } from '@/components/OnboardingContainer';

interface PermissionItemProps {
  icon: any;
  title: string;
  description: string;
  status: 'pending' | 'granted' | 'denied';
  onPress: () => void;
}

const PermissionItem: React.FC<PermissionItemProps> = ({ 
  icon, 
  title, 
  description, 
  status, 
  onPress 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'granted': return 'bg-green-500';
      case 'denied': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'granted': return 'Concedido';
      case 'denied': return 'Denegado';
      default: return 'Permitir';
    }
  };

  return (
    <View className="border border-border rounded-xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
            {icon}
          </View>
          <Text className="text-base font-semibold text-foreground">
            {title}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
          <Text className="text-white text-xs font-medium">
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <Text className="text-muted-foreground mb-3 leading-relaxed text-xs pl-13">
        {description}
      </Text>
      
      {status === 'pending' && (
        <TouchableOpacity
          onPress={onPress}
          className="bg-primary rounded-lg py-2.5 ml-13"
        >
          <Text className="text-white text-center font-medium text-sm">
            Conceder Permiso
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function PermissionsScreen() {
  const [cameraStatus, setCameraStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [locationStatus, setLocationStatus] = useState<'pending' | 'granted' | 'denied'>('pending');

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraStatus(status === 'granted' ? 'granted' : 'denied');
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso de Cámara',
          'La cámara es necesaria para reconocer lugares. Puedes habilitarla más tarde en la configuración.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setCameraStatus('denied');
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationStatus(status === 'granted' ? 'granted' : 'denied');
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso de Ubicación',
          'La ubicación nos ayuda a darte recomendaciones personalizadas. Puedes habilitarla más tarde en la configuración.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationStatus('denied');
    }
  };

  return (
    <OnboardingContainer
      currentStep={3}
      totalSteps={4}
      nextPath="/(onboarding)/ready"
      backPath="/(onboarding)/features"
    >
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Ionicons name="shield-checkmark" size={32} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold text-foreground text-center mb-3">
            Permisos Necesarios
          </Text>
          <Text className="text-sm text-muted-foreground text-center px-4">
            Para ofrecerte la mejor experiencia, necesitamos algunos permisos
          </Text>
        </View>

        {/* Permissions List - Fixed spacing */}
        <View className="space-y-4 mb-8">
          <PermissionItem
            icon={<Ionicons name="camera" size={24} color="#3B82F6" />}
            title="Cámara"
            description="Necesaria para tomar fotos de lugares y monumentos que quieras descubrir. Sin esto, no podremos identificar automáticamente los sitios."
            status={cameraStatus}
            onPress={requestCameraPermission}
          />

          <PermissionItem
            icon={<Ionicons name="location" size={24} color="#3B82F6" />}
            title="Ubicación"
            description="Nos permite sugerir lugares de interés cercanos y personalizar tu experiencia según donde te encuentres."
            status={locationStatus}
            onPress={requestLocationPermission}
          />
        </View>
        
        {/* Info text */}
        <View className="items-center">
          <Text className="text-xs text-muted-foreground text-center px-8">
            Puedes conceder estos permisos más tarde en la configuración de la app
          </Text>
        </View>
      </View>
    </OnboardingContainer>
  );
}
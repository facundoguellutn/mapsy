import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Container } from '@/components/container';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface ProfileItemProps {
  icon: any;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showChevron = true,
  danger = false
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-card border border-border rounded-lg p-4 mb-3"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center space-x-3">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${
          danger ? 'bg-red-100' : 'bg-primary/10'
        }`}>
          {icon}
        </View>
        <View className="flex-1">
          <Text className={`font-semibold ${
            danger ? 'text-red-600' : 'text-foreground'
          }`}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-muted-foreground">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showChevron && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={danger ? "#DC2626" : "#6B7280"} 
        />
      )}
    </View>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { state, logout } = useAuth();
  const { user } = state;

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile');
  };

  const handleLanguage = () => {
    // TODO: Show language picker
    console.log('Language settings');
  };

  const handleTheme = () => {
    // TODO: Show theme picker
    console.log('Theme settings');
  };

  const handleNotifications = () => {
    // TODO: Navigate to notifications settings
    console.log('Notifications settings');
  };

  const handlePrivacy = () => {
    // TODO: Navigate to privacy settings
    console.log('Privacy settings');
  };

  const handleAbout = () => {
    // TODO: Navigate to about screen
    console.log('About');
  };

  const handleSupport = () => {
    // TODO: Open support/contact
    console.log('Support');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ],
    );
  };

  const getThemeText = () => {
    switch (user?.preferences?.theme) {
      case 'light': return 'Claro';
      case 'dark': return 'Oscuro';
      default: return 'Sistema';
    }
  };

  const getLanguageText = () => {
    switch (user?.preferences?.language) {
      case 'en': return 'English';
      case 'fr': return 'Français';
      case 'de': return 'Deutsch';
      case 'pt': return 'Português';
      default: return 'Español';
    }
  };

  return (
    <Container>
      <ScrollView className="flex-1 px-6 py-6">
        {/* Profile Header */}
        <View className="bg-card border border-border rounded-xl p-6 mb-6">
          <View className="items-center">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-foreground mb-1">
              {user?.name || 'Usuario'}
            </Text>
            <Text className="text-muted-foreground mb-4">
              {user?.email}
            </Text>
            
            {/* Stats */}
            <View className="flex-row justify-center space-x-8">
              <View className="items-center">
                <Text className="text-lg font-bold text-primary">0</Text>
                <Text className="text-xs text-muted-foreground">Lugares</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-green-500">0</Text>
                <Text className="text-xs text-muted-foreground">Favoritos</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-orange-500">0</Text>
                <Text className="text-xs text-muted-foreground">Chats</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <Text className="text-lg font-bold text-foreground mb-4">
          Cuenta
        </Text>
        
        <ProfileItem
          icon={<Ionicons name="person" size={20} color="#3B82F6" />}
          title="Editar Perfil"
          subtitle="Cambiar nombre, foto y más"
          onPress={handleEditProfile}
        />

        {/* Settings Section */}
        <Text className="text-lg font-bold text-foreground mb-4 mt-6">
          Configuración
        </Text>
        
        <ProfileItem
          icon={<Ionicons name="language" size={20} color="#3B82F6" />}
          title="Idioma"
          subtitle={getLanguageText()}
          onPress={handleLanguage}
        />

        <ProfileItem
          icon={<Ionicons name="moon" size={20} color="#3B82F6" />}
          title="Apariencia"
          subtitle={getThemeText()}
          onPress={handleTheme}
        />

        <ProfileItem
          icon={<Ionicons name="notifications" size={20} color="#3B82F6" />}
          title="Notificaciones"
          subtitle="Gestionar notificaciones"
          onPress={handleNotifications}
        />

        <ProfileItem
          icon={<Ionicons name="shield-checkmark" size={20} color="#3B82F6" />}
          title="Privacidad"
          subtitle="Datos y permisos"
          onPress={handlePrivacy}
        />

        {/* Support Section */}
        <Text className="text-lg font-bold text-foreground mb-4 mt-6">
          Soporte
        </Text>
        
        <ProfileItem
          icon={<Ionicons name="help-circle" size={20} color="#3B82F6" />}
          title="Ayuda y Soporte"
          subtitle="Contactar soporte"
          onPress={handleSupport}
        />

        <ProfileItem
          icon={<Ionicons name="information-circle" size={20} color="#3B82F6" />}
          title="Acerca de Mapsy"
          subtitle={`Versión 1.0.0`}
          onPress={handleAbout}
        />

        {/* Logout */}
        <View className="mt-8 mb-6">
          <ProfileItem
            icon={<Ionicons name="log-out" size={20} color="#DC2626" />}
            title="Cerrar Sesión"
            onPress={handleLogout}
            showChevron={false}
            danger
          />
        </View>

        {/* App Info */}
        <View className="items-center py-6">
          <Text className="text-sm text-muted-foreground text-center">
            Mapsy - Tu guía turístico inteligente{'\n'}
            Versión 1.0.0
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
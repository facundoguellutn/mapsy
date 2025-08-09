import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Container } from '@/components/container';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface QuickActionProps {
  icon: any;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  onPress 
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-card border border-border rounded-xl p-4 mr-4"
    style={{ width: width * 0.7 }}
  >
    <View className="flex-row items-center space-x-3 mb-3">
      <View 
        className="w-12 h-12 rounded-full items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {icon}
      </View>
      <Text className="text-lg font-semibold text-foreground flex-1">
        {title}
      </Text>
    </View>
    <Text className="text-muted-foreground leading-relaxed">
      {description}
    </Text>
  </TouchableOpacity>
);

interface RecentItemProps {
  title: string;
  location: string;
  date: string;
  onPress: () => void;
}

const RecentItem: React.FC<RecentItemProps> = ({ title, location, date, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-card border border-border rounded-lg p-4 mb-3"
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground mb-1">
          {title}
        </Text>
        <Text className="text-sm text-muted-foreground mb-2">
          {location}
        </Text>
        <Text className="text-xs text-muted-foreground">
          {date}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const { state } = useAuth();
  const { user } = state;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const handleTakePhoto = () => {
    // TODO: Navigate to camera screen
    console.log('Take photo');
  };

  const handleExploreNearby = () => {
    // TODO: Navigate to explore screen
    console.log('Explore nearby');
  };

  const handleAskQuestion = () => {
    // TODO: Navigate to chat screen
    console.log('Ask question');
  };

  const handleViewFavorites = () => {
    // TODO: Navigate to favorites screen
    console.log('View favorites');
  };

  const handleRecentItemPress = (item: string) => {
    console.log('Recent item pressed:', item);
  };

  return (
    <Container>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View className="px-6 py-8">
          <Text className="text-lg text-muted-foreground">
            {getGreeting()},
          </Text>
          <Text className="text-2xl font-bold text-foreground">
            {user?.name?.split(' ')[0] || 'Explorador'}! 👋
          </Text>
          <Text className="text-muted-foreground mt-2">
            ¿Listo para descubrir algo nuevo hoy?
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground px-6 mb-4">
            Acciones Rápidas
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}
          >
            <QuickAction
              icon={<Ionicons name="camera" size={24} color="white" />}
              title="Tomar Foto"
              description="Fotografía un lugar y descubre su historia al instante"
              color="#3B82F6"
              onPress={handleTakePhoto}
            />
            
            <QuickAction
              icon={<Ionicons name="location" size={24} color="white" />}
              title="Explorar Cerca"
              description="Encuentra lugares interesantes en tu área"
              color="#10B981"
              onPress={handleExploreNearby}
            />
            
            <QuickAction
              icon={<Ionicons name="chatbubble-ellipses" size={24} color="white" />}
              title="Preguntarme"
              description="Conversa con nuestra IA sobre cualquier lugar"
              color="#F59E0B"
              onPress={handleAskQuestion}
            />
          </ScrollView>
        </View>

        {/* Stats/Overview */}
        <View className="px-6 mb-8">
          <View className="bg-card border border-border rounded-xl p-6">
            <Text className="text-lg font-semibold text-foreground mb-4">
              Tu Progreso
            </Text>
            
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">0</Text>
                <Text className="text-sm text-muted-foreground">Lugares</Text>
                <Text className="text-sm text-muted-foreground">Descubiertos</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-500">0</Text>
                <Text className="text-sm text-muted-foreground">Favoritos</Text>
                <Text className="text-sm text-muted-foreground">Guardados</Text>
              </View>
              
              <View className="items-center">
                <Text className="text-2xl font-bold text-orange-500">0</Text>
                <Text className="text-sm text-muted-foreground">Conversaciones</Text>
                <Text className="text-sm text-muted-foreground">con IA</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-foreground">
              Actividad Reciente
            </Text>
            <TouchableOpacity onPress={handleViewFavorites}>
              <Text className="text-primary font-medium">Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          {/* Empty State */}
          <View className="bg-card border border-border rounded-xl p-8 items-center">
            <View className="w-16 h-16 bg-muted rounded-full items-center justify-center mb-4">
              <Ionicons name="camera-outline" size={32} color="#6B7280" />
            </View>
            <Text className="text-lg font-semibold text-foreground mb-2">
              ¡Comienza tu aventura!
            </Text>
            <Text className="text-muted-foreground text-center mb-4">
              Toma tu primera foto para comenzar a descubrir lugares increíbles
            </Text>
            <TouchableOpacity
              onPress={handleTakePhoto}
              className="bg-primary rounded-lg px-6 py-3"
            >
              <Text className="text-white font-semibold">
                Tomar Primera Foto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-foreground mb-4">
            Consejos
          </Text>
          
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <View className="flex-row items-start space-x-3">
              <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center mt-1">
                <Ionicons name="bulb" size={16} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-blue-900 mb-1">
                  Tip del día
                </Text>
                <Text className="text-blue-800 text-sm leading-relaxed">
                  Para mejores resultados, toma fotos claras y enfócate en elementos 
                  distintivos como fachadas, monumentos o señalizaciones.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { api } from '@/lib/api';

interface ChatSession {
  id: string;
  country: string;
  city: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastMessage?: {
    content: string;
    type: string;
    sender: string;
    timestamp: string;
  };
}

export default function ChatHistoryScreen() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = async (refresh = false) => {
    try {
      if (!refresh) setIsLoading(true);
      const response = await api.get<{ sessions: ChatSession[] }>('/api/chat/sessions');

      if (response.success) {
        setSessions(response.data?.sessions || []);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los chats');
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      Alert.alert('Error', 'No se pudieron cargar los chats');
    } finally {
      setIsLoading(false);
      if (refresh) setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadChatSessions(true);
  };

  const openChat = (sessionId: string) => {
    router.push({
      pathname: '/(authenticated)/chat/[sessionId]',
      params: { sessionId },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Ayer';
    } else if (days < 7) {
      return `Hace ${days} días`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getLastMessagePreview = (session: ChatSession) => {
    if (!session.lastMessage) return 'Sin mensajes';

    const { content, type, sender } = session.lastMessage;
    
    if (type === 'image') return '📷 Imagen';
    if (type === 'recommendation') return '📍 Recomendaciones';
    if (type === 'system') return content.slice(0, 50) + '...';
    
    const prefix = sender === 'user' ? 'Tú: ' : '';
    return prefix + (content.length > 50 ? content.slice(0, 50) + '...' : content);
  };

  const getCountryFlag = (country: string) => {
    // Simple mapping for common countries
    const flagMap: { [key: string]: string } = {
      'Argentina': '🇦🇷',
      'Brasil': '🇧🇷',
      'Estados Unidos': '🇺🇸',
      'España': '🇪🇸',
      'Francia': '🇫🇷',
      'Italia': '🇮🇹',
      'México': '🇲🇽',
      'Reino Unido': '🇬🇧',
      'Alemania': '🇩🇪',
      'Japón': '🇯🇵',
      'China': '🇨🇳',
    };
    
    return flagMap[country] || '🌍';
  };

  const renderChatSession = ({ item }: { item: ChatSession }) => (
    <TouchableOpacity
      onPress={() => openChat(item.id)}
      className="bg-card border border-border rounded-lg mx-4 mb-3 p-4"
    >
      <View className="flex-row items-start">
        <View className="mr-3">
          <Text className="text-2xl">{getCountryFlag(item.country)}</Text>
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-semibold text-foreground flex-1" numberOfLines={1}>
              {item.title || `${item.city}, ${item.country}`}
            </Text>
            <Text className="text-xs text-muted-foreground ml-2">
              {formatDate(item.lastMessage?.timestamp || item.updatedAt)}
            </Text>
          </View>
          
          <Text className="text-sm text-primary font-medium mb-2">
            {item.city}, {item.country}
          </Text>
          
          <Text className="text-sm text-muted-foreground" numberOfLines={2}>
            {getLastMessagePreview(item)}
          </Text>
        </View>
        
        <View className="ml-2">
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6">
      <View className="items-center">
        <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="chatbubbles-outline" size={40} color="#9CA3AF" />
        </View>
        
        <Text className="text-xl font-bold text-foreground text-center mb-2">
          No tienes chats aún
        </Text>
        
        <Text className="text-muted-foreground text-center mb-6 leading-6">
          Comienza tu primer chat turístico para explorar lugares increíbles con información detallada
        </Text>
        
        <TouchableOpacity
          onPress={() => router.push('/chat-setup')}
          className="bg-primary rounded-lg py-3 px-6 flex-row items-center"
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">
            Crear primer chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-muted-foreground mt-4">Cargando chats...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex-1">
        {/* Header */}
        <View className="bg-card border-b border-border p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-foreground">
                Mis Chats
              </Text>
              <Text className="text-muted-foreground">
                {sessions.length} {sessions.length === 1 ? 'conversación' : 'conversaciones'}
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={() => router.push('/chat-setup')}
              className="bg-primary p-3 rounded-lg"
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat List */}
        {sessions.length > 0 ? (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={renderChatSession}
            className="flex-1 bg-background"
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={['#3B82F6']}
                tintColor="#3B82F6"
              />
            }
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </Container>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/lib/api';

interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'recommendation' | 'system';
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  processing?: boolean;
  recommendations?: PlaceRecommendation[];
  landmarkInfo?: any;
}

interface PlaceRecommendation {
  name: string;
  type: string;
  distance?: number;
  description: string;
  rating?: number;
}

interface ChatSession {
  id: string;
  country: string;
  city: string;
  title?: string;
}

type GetMessagesResponse = {
  session: ChatSession;
  messages: ChatMessage[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
  };
};

type PostMessageResponse = {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
};

type RecommendationsResponse = {
  message: ChatMessage;
  recommendations: PlaceRecommendation[];
};

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const sessionId = Array.isArray(params.sessionId)
    ? params.sessionId[0]
    : (params.sessionId as string | undefined);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!sessionId) return; // wait until param is available
    loadChatData();
  }, [sessionId]);

  const loadChatData = async () => {
    try {
      if (!sessionId) return;
      setIsLoading(true);
      const response = await api.get<GetMessagesResponse>(`/api/chat/sessions/${sessionId}/messages`);
      
      if (response.success && response.data) {
        setSession(response.data.session);
        setMessages(response.data.messages);
      } else {
        Alert.alert('Error', 'No se pudo cargar el chat');
        router.back();
      }
    } catch (error) {
      console.error('Error loading chat:', error);
      Alert.alert('Error', 'No se pudo cargar el chat');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = async () => {
    if (!inputText.trim() || isSending) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsSending(true);

    try {
      const response = await api.post<PostMessageResponse>(`/api/chat/sessions/${sessionId}/messages`, {
        content: messageText
      });

      if (response.success && response.data) {
        const { userMessage, assistantMessage } = response.data;
        setMessages(prev => [...prev, userMessage, assistantMessage]);
        scrollToBottom();
      } else {
        Alert.alert('Error', 'No se pudo enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'No se pudo enviar el mensaje');
    } finally {
      setIsSending(false);
    }
  };

  const sendImageMessage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permisos necesarios', 'Se necesita acceso a la cámara para tomar fotos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (!sessionId) {
        Alert.alert('Error', 'ID de sesión inválido');
        return;
      }
      setIsSending(true);

      try {
        const formData = new FormData();
        formData.append('image', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);

        const response = await api.post<PostMessageResponse>(`/api/chat/sessions/${sessionId}/images`, formData);

        if (response.success && response.data) {
          const { userMessage, assistantMessage } = response.data;
          setMessages(prev => [...prev, userMessage, assistantMessage]);
          scrollToBottom();
        } else {
          Alert.alert('Error', 'No se pudo procesar la imagen');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'No se pudo subir la imagen');
      } finally {
        setIsSending(false);
      }
    }
  };

  const getRecommendations = async () => {
    try {
      if (!sessionId) {
        Alert.alert('Error', 'ID de sesión inválido');
        return;
      }
      setIsSending(true);
      const response = await api.post<RecommendationsResponse>(`/api/chat/sessions/${sessionId}/recommendations`, {});

      if (response.success && response.data) {
        const { message } = response.data;
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      } else {
        Alert.alert('Error', 'No se pudieron obtener recomendaciones');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      Alert.alert('Error', 'No se pudieron obtener recomendaciones');
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';
    const isSystem = item.type === 'system';

    if (isSystem) {
      return (
        <View className="items-center my-4 mx-4">
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-[90%]">
            <Text className="text-blue-800 text-center leading-6">
              {item.content}
            </Text>
          </View>
        </View>
      );
    }

    if (item.type === 'recommendation') {
      return (
        <View className="mb-4 mx-4">
          <View className="bg-card border border-border rounded-lg p-4">
            <Text className="text-foreground font-medium mb-3">
              {item.content}
            </Text>
            {item.recommendations && item.recommendations.map((rec, index) => (
              <View key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-lg font-semibold text-foreground flex-1">
                    {rec.name}
                  </Text>
                  {rec.rating && (
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#FCD34D" />
                      <Text className="text-sm text-muted-foreground ml-1">
                        {rec.rating}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-sm text-primary font-medium mb-1">
                  {rec.type} {rec.distance && `• ${rec.distance}m`}
                </Text>
                <Text className="text-sm text-muted-foreground leading-5">
                  {rec.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View className={`mb-4 mx-4 ${isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-[85%] px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-primary'
              : 'bg-card border border-border'
          }`}
        >
          {item.processing && (
            <View className="flex-row items-center mb-2">
              <ActivityIndicator size="small" color={isUser ? 'white' : '#3B82F6'} />
              <Text className={`ml-2 text-sm ${isUser ? 'text-white' : 'text-muted-foreground'}`}>
                Procesando...
              </Text>
            </View>
          )}
          <Text className={`leading-6 ${isUser ? 'text-white' : 'text-foreground'}`}>
            {item.content}
          </Text>
          {item.type === 'image' && item.landmarkInfo && (
            <View className="mt-3 pt-3 border-t border-white/20">
              <Text className={`text-sm ${isUser ? 'text-white/80' : 'text-muted-foreground'}`}>
                📍 Lugar detectado
              </Text>
            </View>
          )}
        </View>
        <Text className="text-xs text-muted-foreground mt-1">
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-muted-foreground mt-4">Cargando chat...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-card border-b border-border p-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">
                {session?.title || `${session?.city}, ${session?.country}`}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Guía turístico • {session?.city}
              </Text>
            </View>
            <TouchableOpacity onPress={getRecommendations} disabled={isSending}>
              <View className="bg-primary/10 p-2 rounded-lg">
                <Ionicons name="location" size={20} color="#3B82F6" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          className="flex-1 bg-background"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        />

        {/* Input Area */}
        <View className="bg-card border-t border-border p-4">
          <View className="flex-row items-end">
            <View className="flex-1 mr-3">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Pregunta sobre lugares, cultura, historia..."
                multiline
                maxLength={500}
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground max-h-24"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              onPress={sendImageMessage}
              disabled={isSending}
              className="bg-gray-100 p-3 rounded-lg mr-2"
            >
              <Ionicons name="camera" size={20} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={sendTextMessage}
              disabled={!inputText.trim() || isSending}
              className={`p-3 rounded-lg ${
                inputText.trim() && !isSending
                  ? 'bg-primary'
                  : 'bg-gray-300'
              }`}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="send" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
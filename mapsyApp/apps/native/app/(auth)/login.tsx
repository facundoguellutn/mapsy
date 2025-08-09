import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/container';
import { useAuth } from '@/contexts/AuthContext';
import { LoginData, LoginSchema } from '@/lib/api';

export default function LoginScreen() {
  const { state, login, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      console.log('📱 Login form submitted with data:', data);
      clearError();
      setIsSuccess(false);
      await login(data);
      console.log('📱 Login function completed successfully');
      
      // Opcional: mostrar breve mensaje y redirigir al flujo raíz que decide (onboarding/home)
      setIsSuccess(true);
      router.replace('/');
      
    } catch (error) {
      console.log('📱 Login form error:', error);
      setIsSuccess(false);
      // Error is already handled in the context and will show in the UI
    }
  };

  // Success message
  const renderSuccessMessage = () => {
    if (!isSuccess) return null;
    return (
      <View className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <Text className="text-green-700 font-medium">
          ¡Sesión iniciada exitosamente! Redirigiendo...
        </Text>
      </View>
    );
  };

  const renderGlobalError = () => {
    if (!state.error) return null;
    return (
      <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <Text className="text-red-700">{state.error}</Text>
      </View>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo/Brand */}
            <View className="items-center mb-8">
              <Text className="text-4xl font-bold text-primary mb-2">
                Mapsy
              </Text>
              <Text className="text-lg text-muted-foreground text-center">
                Tu guía turístico inteligente
              </Text>
            </View>

              {renderSuccessMessage()}
              {renderGlobalError()}
              {/* Login Form */}
            <View className="space-y-4">
              <Text className="text-2xl font-bold text-foreground mb-6">
                Iniciar Sesión
              </Text>

              {/* Email Input */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`border rounded-lg px-4 py-3 text-foreground ${
                        errors.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-border bg-background'
                      }`}
                      placeholder="tu@email.com"
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Contraseña
                </Text>
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`border rounded-lg px-4 py-3 pr-12 text-foreground ${
                          errors.password
                            ? 'border-red-500 bg-red-50'
                            : 'border-border bg-background'
                        }`}
                        placeholder="Tu contraseña"
                        placeholderTextColor="#9CA3AF"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Text className="text-primary">
                      {showPassword ? 'Ocultar' : 'Ver'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || state.isLoading}
                className={`rounded-lg py-4 mt-6 ${
                  isSubmitting || state.isLoading
                    ? 'bg-primary/50'
                    : 'bg-primary'
                }`}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isSubmitting || state.isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-muted-foreground">
                  ¿No tienes cuenta?{' '}
                </Text>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-semibold">
                      Regístrate
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
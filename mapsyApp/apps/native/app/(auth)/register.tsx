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
import { RegisterData, RegisterSchema } from '@/lib/api';

export default function RegisterScreen() {
  const { state, register, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      console.log('📱 Register form submitted with data:', data);
      clearError();
      setIsSuccess(false);
      await register(data);
      console.log('📱 Register function completed successfully');
      
      // Opcional: mostrar breve mensaje y redirigir al flujo raíz que decide (onboarding/home)
      setIsSuccess(true);
      router.replace('/');
      
    } catch (error) {
      console.log('📱 Register form error:', error);
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
          ¡Cuenta creada exitosamente! Redirigiendo...
        </Text>
      </View>
    );
  };

  // Friendly inline error instead of only alerts
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
                Únete a la aventura
              </Text>
            </View>

            {renderSuccessMessage()}
            {renderGlobalError()}
            {/* Register Form */}
            <View className="space-y-4">
              <Text className="text-2xl font-bold text-foreground mb-6">
                Crear Cuenta
              </Text>

              {/* Name Input */}
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Nombre
                </Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`border rounded-lg px-4 py-3 text-foreground ${
                        errors.name
                          ? 'border-red-500 bg-red-50'
                          : 'border-border bg-background'
                      }`}
                      placeholder="Tu nombre completo"
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  )}
                />
                {errors.name && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </Text>
                )}
              </View>

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
                        placeholder="Mínimo 6 caracteres"
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

              {/* Register Button */}
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
                  {isSubmitting || state.isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-semibold">
                      Inicia sesión
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>

              {/* Terms */}
              <Text className="text-center text-xs text-muted-foreground mt-4">
                Al crear una cuenta, aceptas nuestros{' '}
                <Text className="text-primary">Términos de Servicio</Text> y{' '}
                <Text className="text-primary">Política de Privacidad</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
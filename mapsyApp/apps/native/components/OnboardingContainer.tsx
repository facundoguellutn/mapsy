import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Container } from '@/components/container';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingContainerProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  backPath?: string;
  nextPath?: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  onNext?: () => void;
  onBack?: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  backPath,
  nextPath,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = 'Continuar',
  nextButtonDisabled = false,
  onNext,
  onBack,
}) => {
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextPath) {
      router.push(nextPath as any);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      router.push(backPath as any);
    } else {
      router.back();
    }
  };

  const ProgressIndicator = () => (
    <View className="flex-row justify-center items-center space-x-3">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        
        return (
          <View
            key={step}
            className={`h-2 rounded-full ${
              isActive 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted'
            }`}
          />
        );
      })}
    </View>
  );

  return (
    <Container>
      <View className="flex-1">
        {children}
      </View>

      {/* Navigation Section */}
      <View className="px-6 pb-6 pt-3">
        {/* Navigation Buttons */}
        <View className="flex-row items-center justify-between mb-4">
          {showBackButton ? (
            <TouchableOpacity
              onPress={handleBack}
              className="border border-border rounded-lg px-4 py-2.5 flex-row items-center"
            >
              <Ionicons name="chevron-back" size={16} color="#6B7280" />
              <Text className="text-foreground font-medium text-sm ml-1">
                Atrás
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {showNextButton && (
            <TouchableOpacity
              onPress={handleNext}
              disabled={nextButtonDisabled}
              className={`rounded-lg px-4 py-2.5 flex-row items-center ${
                nextButtonDisabled ? 'bg-primary/30' : 'bg-primary'
              }`}
            >
              <Text className={`font-semibold text-sm mr-1 ${
                nextButtonDisabled ? 'text-white/70' : 'text-white'
              }`}>
                {nextButtonText}
              </Text>
              <Ionicons 
                name={nextButtonText.includes('Explorar') ? 'rocket' : 'chevron-forward'}
                size={16} 
                color={nextButtonDisabled ? "rgba(255,255,255,0.7)" : "white"} 
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Progress Indicator */}
        <ProgressIndicator />
      </View>
    </Container>
  );
};
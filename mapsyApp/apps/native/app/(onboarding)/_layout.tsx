import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OnboardingLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="features" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="ready" />
      </Stack>
    </>
  );
}
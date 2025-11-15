/**
 * Root Layout
 * 根佈局 - 應用程式入口
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // TODO: Initialize app (load user data, check auth, etc.)
    // For now, just hide splash screen after a delay
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F1ED' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(her)" />
        <Stack.Screen name="(partner)" />
      </Stack>
    </SafeAreaProvider>
  );
}

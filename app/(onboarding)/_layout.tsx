/**
 * Onboarding Layout
 * 新手引導佈局
 */

import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F5F1ED' },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="her-setup" />
      <Stack.Screen name="partner-pairing" />
    </Stack>
  );
}

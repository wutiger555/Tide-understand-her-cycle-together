/**
 * Welcome Screen
 * 歡迎畫面 - onboarding 第一步
 */

import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function WelcomeScreen() {
  const router = useRouter();

  // TODO: 實作完整的歡迎畫面UI
  // - 應用logo
  // - 簡介文字
  // - "Get Started" 按鈕

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Tide</Text>
        <Text style={styles.subtitle}>Understand her cycle together</Text>

        {/* TODO: 添加插圖 */}

        <Text style={styles.description}>
          A gentle, respectful way for couples to understand and support each other through her natural rhythms.
        </Text>

        {/* TODO: 添加 "Get Started" 按鈕 */}
        {/* 點擊後導航至 role-selection */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    padding: theme.padding.screen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.styles.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.styles.subtitle1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  description: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing['3xl'],
  },
});

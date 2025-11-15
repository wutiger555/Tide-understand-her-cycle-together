/**
 * Settings Screen (Partner)
 * 設定畫面
 */

import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function PartnerSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.placeholder}>Partner settings will go here</Text>
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
  },
  title: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  placeholder: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

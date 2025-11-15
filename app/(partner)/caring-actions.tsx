/**
 * Caring Actions Screen (Partner)
 * 關懷行動畫面
 */

import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function CaringActionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Caring Actions</Text>
        <Text style={styles.placeholder}>Log your caring actions here</Text>
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

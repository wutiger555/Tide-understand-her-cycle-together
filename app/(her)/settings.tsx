/**
 * Settings Screen (Her)
 * 設定畫面
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partner Sharing</Text>
          <Text style={styles.placeholder}>Partner sharing controls will go here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text style={styles.placeholder}>Notification settings will go here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cycle Preferences</Text>
          <Text style={styles.placeholder}>Cycle tracking preferences will go here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.padding.screen,
  },
  title: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.styles.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  placeholder: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.tertiary,
    fontStyle: 'italic',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.radius.md,
    textAlign: 'center',
  },
});

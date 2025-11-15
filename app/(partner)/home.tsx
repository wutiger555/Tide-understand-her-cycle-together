/**
 * Partner Home Screen
 * Partner 的主畫面
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePartnerStore } from '@stores';
import { theme } from '@theme';

export default function PartnerHomeScreen() {
  const partnerVisibleData = usePartnerStore((state) => state.partnerVisibleData);
  const suggestions = usePartnerStore((state) => state.suggestions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Today's Guidance 🤝</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        {/* Today's Status Card */}
        {suggestions ? (
          <View style={[styles.statusCard, { borderLeftColor: theme.colors.phases.lutealEarly.primary }]}>
            <Text style={styles.cycleDay}>Day {suggestions.cycleDay} - {suggestions.phase}</Text>
            <Text style={styles.phaseExplanation}>{suggestions.phaseExplanation}</Text>
          </View>
        ) : (
          <View style={styles.statusCard}>
            <Text style={styles.statusMessage}>Not paired yet</Text>
            <Text style={styles.phaseDescription}>
              Ask her to share her pairing code with you to get started.
            </Text>
          </View>
        )}

        {/* Suggested Actions */}
        {suggestions && suggestions.suggestedActions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested Actions</Text>
            {suggestions.suggestedActions.map((action, index) => (
              <View key={index} style={styles.actionItem}>
                <Text style={styles.actionBullet}>💡</Text>
                <Text style={styles.actionText}>{action}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Things to Watch */}
        {suggestions && suggestions.thingsToWatch.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What to Expect</Text>
            {suggestions.thingsToWatch.map((item, index) => (
              <View key={index} style={styles.watchItem}>
                <Text style={styles.watchBullet}>👀</Text>
                <Text style={styles.watchText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Things to Avoid */}
        {suggestions && suggestions.thingsToAvoid && suggestions.thingsToAvoid.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Things to Avoid</Text>
            {suggestions.thingsToAvoid.map((item, index) => (
              <View key={index} style={styles.avoidItem}>
                <Text style={styles.avoidBullet}>⚠️</Text>
                <Text style={styles.avoidText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {/* TODO: 添加快速操作按鈕 */}
          <Text style={styles.placeholder}>Send a caring card or log an action</Text>
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
  header: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
  },
  statusCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.radius.lg,
    padding: theme.padding.card,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.phases.lutealEarly.primary,
    ...theme.shadows.md,
  },
  cycleDay: {
    ...theme.typography.styles.subtitle1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  phaseExplanation: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.secondary,
  },
  statusMessage: {
    ...theme.typography.styles.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  phaseDescription: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.styles.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  actionBullet: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  actionText: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.primary,
    flex: 1,
  },
  watchItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  watchBullet: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  watchText: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  avoidItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  avoidBullet: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  avoidText: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
    flex: 1,
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

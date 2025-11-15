/**
 * Insights Screen (Her)
 * 洞察畫面 - 顯示週期分析和模式
 */

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInsightsStore, useCycleStore } from '@stores';
import { theme } from '@theme';
import { calculateAverageCycleLength, calculateAveragePeriodLength, calculateCycleLengthVariance } from '@utils';

export default function InsightsScreen() {
  const insights = useInsightsStore((state) => state.insights);
  const periods = useCycleStore((state) => state.periods);

  // 計算基本統計
  const avgCycleLength = calculateAverageCycleLength(periods);
  const avgPeriodLength = calculateAveragePeriodLength(periods);
  const variance = calculateCycleLengthVariance(periods);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Insights</Text>

        {/* Cycle Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cycle Statistics</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{avgCycleLength || '--'}</Text>
              <Text style={styles.statLabel}>Avg Cycle Length</Text>
              <Text style={styles.statUnit}>days</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{avgPeriodLength || '--'}</Text>
              <Text style={styles.statLabel}>Avg Period Length</Text>
              <Text style={styles.statUnit}>days</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{periods.length}</Text>
              <Text style={styles.statLabel}>Cycles Tracked</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {variance < 2 ? 'Very Regular' : variance < 4 ? 'Regular' : variance < 7 ? 'Somewhat' : 'Irregular'}
              </Text>
              <Text style={styles.statLabel}>Regularity</Text>
            </View>
          </View>
        </View>

        {/* Common Symptoms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Symptoms</Text>
          <Text style={styles.placeholder}>Symptom patterns will appear here after logging for a few cycles</Text>
        </View>

        {/* Mood Patterns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Patterns</Text>
          <Text style={styles.placeholder}>Mood patterns will appear here after logging for a few cycles</Text>
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
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  statValue: {
    ...theme.typography.styles.h2,
    color: theme.colors.phases.menstrual.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  statUnit: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
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

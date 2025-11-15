/**
 * Her Home Screen - Redesigned
 * Her 的主畫面 - 重新設計版本（參考 Flo/Clue 的最佳實踐）
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useCycleStore } from '@stores';
import { theme, getPhaseColors } from '@theme';
import { getTodayCycleInfo, getPhaseInfo, formatFriendlyDate } from '@utils';
import {
  CycleRing,
  PhaseIndicator,
  IconButton,
  Card,
  QuickLogSheet,
  type QuickLogSheetRef,
} from '@components';

export default function HerHomeScreen() {
  const quickLogRef = useRef<QuickLogSheetRef>(null);

  const periods = useCycleStore((state) => state.periods);
  const addDailyLog = useCycleStore((state) => state.addDailyLog);

  // 計算今天的週期資訊
  const todayCycleInfo = getTodayCycleInfo(periods);
  const phaseInfo = todayCycleInfo ? getPhaseInfo(todayCycleInfo.phase) : null;
  const phaseColors = todayCycleInfo ? getPhaseColors(todayCycleInfo.phase) : null;

  const handleQuickLog = () => {
    quickLogRef.current?.open();
  };

  const handleSaveLog = (log: any) => {
    // TODO: 實作保存邏輯
    console.log('Saving log:', log);
  };

  // 如果沒有週期數據，顯示歡迎畫面
  if (!todayCycleInfo || !phaseInfo || !phaseColors) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Animated.Text entering={FadeIn.duration(600)} style={styles.emptyTitle}>
            Welcome to Tide 🌊
          </Animated.Text>
          <Animated.Text entering={FadeIn.duration(600).delay(200)} style={styles.emptySubtitle}>
            Start by logging your first period to begin tracking your cycle
          </Animated.Text>
          {/* TODO: Add "Start Tracking" button */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.date}>{formatFriendlyDate(new Date())}</Text>
          </View>

          <IconButton
            icon={<Text style={styles.settingsIcon}>⚙️</Text>}
            onPress={() => {/* Navigate to settings */}}
            variant="ghost"
          />
        </Animated.View>

        {/* Cycle Ring - 主要視覺元素 */}
        <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.cycleSection}>
          <CycleRing
            cycleDay={todayCycleInfo.cycleDay}
            phase={todayCycleInfo.phase}
            avgCycleLength={28}
            size={240}
          />
        </Animated.View>

        {/* Phase Indicator */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.phaseSection}>
          <PhaseIndicator
            phase={todayCycleInfo.phase}
            cycleDay={todayCycleInfo.cycleDay}
          />
        </Animated.View>

        {/* Quick Log Button - 快速記錄CTA */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)} style={styles.quickLogSection}>
          <Pressable
            onPress={handleQuickLog}
            style={({ pressed }) => [
              styles.quickLogButton,
              { backgroundColor: phaseColors.primary },
              pressed && styles.quickLogButtonPressed,
            ]}
          >
            <Text style={styles.quickLogIcon}>✏️</Text>
            <Text style={styles.quickLogText}>How are you feeling today?</Text>
            <Text style={styles.quickLogArrow}>→</Text>
          </Pressable>
        </Animated.View>

        {/* Today's Insights - 今日洞察 */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Insights</Text>

          <Card style={styles.insightCard} accentColor={phaseColors.primary}>
            <Text style={styles.insightTitle}>Energy Level</Text>
            <Text style={styles.insightText}>
              {phaseInfo.commonFeelings[0]}
            </Text>
          </Card>

          <Card style={styles.insightCard} accentColor={phaseColors.primary}>
            <Text style={styles.insightTitle}>What to Expect</Text>
            <Text style={styles.insightText}>
              {phaseInfo.commonFeelings[1] || phaseInfo.description}
            </Text>
          </Card>
        </Animated.View>

        {/* Self-Care Tips */}
        <Animated.View entering={FadeInDown.duration(600).delay(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Self-Care Tips</Text>

          {phaseInfo.selfCareTips.slice(0, 3).map((tip, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.duration(400).delay(500 + index * 100)}
              style={styles.tipItem}
            >
              <View style={[styles.tipDot, { backgroundColor: phaseColors.primary }]} />
              <Text style={styles.tipText}>{tip}</Text>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Upcoming - 預測 */}
        <Animated.View entering={FadeInDown.duration(600).delay(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>

          <Card style={styles.upcomingCard}>
            <View style={styles.upcomingRow}>
              <Text style={styles.upcomingLabel}>Next Period</Text>
              <Text style={styles.upcomingValue}>in ~7 days</Text>
            </View>
            <View style={styles.upcomingRow}>
              <Text style={styles.upcomingLabel}>Fertile Window</Text>
              <Text style={styles.upcomingValue}>Day 10-16</Text>
            </View>
          </Card>
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Quick Log Bottom Sheet */}
      <QuickLogSheet ref={quickLogRef} onSave={handleSaveLog} />
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
    paddingHorizontal: theme.padding.screen,
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing['3xl'],
  },
  emptyTitle: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  emptySubtitle: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    ...theme.typography.styles.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.tertiary,
  },
  settingsIcon: {
    fontSize: 24,
  },

  // Cycle Ring
  cycleSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },

  // Phase
  phaseSection: {
    marginBottom: theme.spacing.xl,
  },

  // Quick Log
  quickLogSection: {
    marginBottom: theme.spacing.xl,
  },
  quickLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    ...theme.shadows.md,
  },
  quickLogButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  quickLogIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  quickLogText: {
    flex: 1,
    ...theme.typography.styles.subtitle1,
    color: theme.colors.white,
    fontWeight: '600',
  },
  quickLogArrow: {
    fontSize: 20,
    color: theme.colors.white,
  },

  // Sections
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.styles.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  // Insights
  insightCard: {
    marginBottom: theme.spacing.md,
  },
  insightTitle: {
    ...theme.typography.styles.caption,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  insightText: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.primary,
  },

  // Tips
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: theme.spacing.md,
  },
  tipText: {
    flex: 1,
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },

  // Upcoming
  upcomingCard: {
    padding: theme.spacing.lg,
  },
  upcomingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  upcomingLabel: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
  },
  upcomingValue: {
    ...theme.typography.styles.subtitle2,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },

  bottomSpacer: {
    height: theme.spacing['3xl'],
  },
});

/**
 * PhaseIndicator Component
 * 階段指示器組件 - 顯示當前週期階段
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CyclePhase } from '@types/cycle';
import { theme, getPhaseColors } from '@theme';
import { getPhaseInfo } from '@utils';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface PhaseIndicatorProps {
  phase: CyclePhase;
  cycleDay: number;
  compact?: boolean;
}

export function PhaseIndicator({ phase, cycleDay, compact = false }: PhaseIndicatorProps) {
  const phaseColors = getPhaseColors(phase);
  const phaseInfo = getPhaseInfo(phase);

  if (compact) {
    return (
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={[styles.compactContainer, { backgroundColor: phaseColors.lighter }]}
      >
        <Text style={[styles.emoji, styles.compactEmoji]}>{phaseInfo.emoji}</Text>
        <View style={styles.compactText}>
          <Text style={[styles.phaseName, { color: phaseColors.text }]}>
            {phaseInfo.nameZh}
          </Text>
          <Text style={styles.cycleDay}>Day {cycleDay}</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={[
        styles.container,
        {
          backgroundColor: phaseColors.lighter,
          borderLeftColor: phaseColors.primary,
        }
      ]}
    >
      <Text style={styles.emoji}>{phaseInfo.emoji}</Text>

      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={[styles.phaseName, { color: phaseColors.text }]}>
            {phaseInfo.nameZh}
          </Text>
          <Text style={styles.cycleDay}>Day {cycleDay}</Text>
        </View>

        <Text style={styles.description}>{phaseInfo.description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...theme.shadows.sm,
  },
  compactContainer: {
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  emoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  compactEmoji: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  compactText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  phaseName: {
    ...theme.typography.styles.subtitle2,
    fontWeight: '600',
  },
  cycleDay: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.sm,
  },
  description: {
    ...theme.typography.styles.body2,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
});

/**
 * CycleRing Component
 * 週期環形圖 - 主要視覺元素
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { CyclePhase } from '@types/cycle';
import { theme, getPhaseColors } from '@theme';

interface CycleRingProps {
  cycleDay: number;
  phase: CyclePhase;
  avgCycleLength?: number;
  size?: number;
}

export function CycleRing({
  cycleDay,
  phase,
  avgCycleLength = 28,
  size = 240,
}: CycleRingProps) {
  const phaseColors = getPhaseColors(phase);
  const progress = cycleDay / avgCycleLength;

  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // 計算各階段的角度
  const phases = [
    { name: 'Menstrual', days: 5, color: theme.colors.phases.menstrual.primary },
    { name: 'Follicular', days: 8, color: theme.colors.phases.follicular.primary },
    { name: 'Ovulatory', days: 3, color: theme.colors.phases.ovulatory.primary },
    { name: 'Luteal Early', days: 6, color: theme.colors.phases.lutealEarly.primary },
    { name: 'Luteal Late', days: 6, color: theme.colors.phases.lutealLate.primary },
  ];

  let currentAngle = -90; // 從頂部開始

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G>
          {/* 背景環 - 顯示各階段 */}
          {phases.map((p, index) => {
            const angle = (p.days / avgCycleLength) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const path = describeArc(
              size / 2,
              size / 2,
              radius,
              startAngle,
              endAngle
            );

            currentAngle = endAngle;

            return (
              <Path
                key={index}
                d={path}
                stroke={p.color}
                strokeWidth={strokeWidth}
                strokeOpacity={0.2}
                fill="none"
              />
            );
          })}

          {/* 進度環 */}
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={phaseColors.primary}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </G>
        </G>
      </Svg>

      {/* 中心內容 */}
      <View style={styles.center}>
        <Text style={[styles.dayNumber, { color: phaseColors.primary }]}>
          {cycleDay}
        </Text>
        <Text style={styles.dayLabel}>Day of Cycle</Text>
      </View>
    </View>
  );
}

// 輔助函數：描述圓弧路徑
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 60,
  },
  dayLabel: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: theme.spacing.xs,
  },
});

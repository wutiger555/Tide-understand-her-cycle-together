/**
 * 主題系統
 * Theme system - centralized design tokens
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, padding, margin } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

/**
 * 完整主題物件
 */
export const theme = {
  colors,
  typography,
  spacing,
  padding,
  margin,
  radius,
  shadows,

  // 其他設計常數
  constants: {
    screenPadding: spacing.md,
    cardPadding: spacing.md,
    buttonHeight: 48,
    inputHeight: 48,
    headerHeight: 56,
    tabBarHeight: 64,
    iconSize: {
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },
  },

  // 動畫時長
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
} as const;

export type Theme = typeof theme;

// 重新導出所有子模組
export { colors, getPhaseColors } from './colors';
export { typography } from './typography';
export { spacing, padding, margin } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';

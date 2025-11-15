/**
 * 圓角系統
 * Border radius system
 */

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

export type Radius = typeof radius;

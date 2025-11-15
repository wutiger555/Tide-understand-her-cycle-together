/**
 * 間距系統
 * Spacing system (8pt grid)
 */

export const spacing = {
  xs: 4,      // 0.5 單位
  sm: 8,      // 1 單位
  md: 16,     // 2 單位
  lg: 24,     // 3 單位
  xl: 32,     // 4 單位
  '2xl': 40,  // 5 單位
  '3xl': 48,  // 6 單位
  '4xl': 64,  // 8 單位
  '5xl': 80,  // 10 單位
} as const;

/**
 * 內邊距預設值
 */
export const padding = {
  screen: spacing.md,        // 畫面邊距
  card: spacing.md,          // 卡片內邊距
  section: spacing.lg,       // 區塊間距
  button: {
    horizontal: spacing.lg,
    vertical: spacing.md,
  },
} as const;

/**
 * 外邊距預設值
 */
export const margin = {
  section: spacing.lg,       // 區塊間距
  card: spacing.md,          // 卡片間距
  element: spacing.sm,       // 元素間距
} as const;

export type Spacing = typeof spacing;

/**
 * 字體系統
 * Typography system
 */

export const typography = {
  // 字體家族
  fontFamily: {
    regular: 'System',       // iOS 預設 San Francisco
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // 字重
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // 字體大小
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // 行高
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // 字母間距
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // 預設樣式組合
  styles: {
    // 大標題
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },

    // 次標題
    h2: {
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },

    // 小標題
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
      letterSpacing: 0,
    },

    // 章節標題
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
      letterSpacing: 0,
    },

    // 子標題
    subtitle1: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    subtitle2: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // 內文
    body1: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    body2: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // 按鈕文字
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.5,
      letterSpacing: 0.5,
    },

    // 說明文字
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    // 過度線
    overline: {
      fontSize: 12,
      fontWeight: '600' as const,
      lineHeight: 1.5,
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
  },
} as const;

export type Typography = typeof typography;

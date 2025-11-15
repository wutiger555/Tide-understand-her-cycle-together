/**
 * 色彩系統
 * Color system with phase-based palette
 */

export const colors = {
  // 基礎色彩
  white: '#FFFFFF',
  black: '#1A1A1A',

  // 中性色階（灰階）
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // 階段色彩
  phases: {
    // 月經期 - 溫暖柔和的紅色調
    menstrual: {
      primary: '#E89E8F',    // 柔和珊瑚紅
      light: '#F5D4CD',      // 淺珊瑚
      lighter: '#FBF0ED',    // 極淺背景
      text: '#8B4A3C',       // 深紅棕（文字）
    },

    // 濾泡期 - 柔和金色/黃色（能量上升）
    follicular: {
      primary: '#E8B88F',    // 柔和金色
      light: '#F5E4CD',      // 淺金色
      lighter: '#FBF7ED',    // 極淺背景
      text: '#8B6A3C',       // 深金棕（文字）
    },

    // 排卵期 - 柔和綠色（生命力）
    ovulatory: {
      primary: '#A8D5BA',    // 柔和綠色
      light: '#D8F0E1',      // 淺綠色
      lighter: '#F0FAF4',    // 極淺背景
      text: '#4A7C59',       // 深綠（文字）
    },

    // 黃體前期 - 柔和藍綠（平靜）
    lutealEarly: {
      primary: '#8FC4E8',    // 柔和天藍
      light: '#CDE4F5',      // 淺藍
      lighter: '#EDF7FB',    // 極淺背景
      text: '#3C6A8B',       // 深藍（文字）
    },

    // 黃體後期 - 柔和紫色（敏感期）
    lutealLate: {
      primary: '#C5A8D5',    // 柔和紫色
      light: '#E6D8F0',      // 淺紫色
      lighter: '#F5F0FA',    // 極淺背景
      text: '#6A4A7C',       // 深紫（文字）
    },
  },

  // 語意色彩
  semantic: {
    // 成功/正面
    success: {
      primary: '#22C55E',
      light: '#86EFAC',
      dark: '#16A34A',
    },

    // 警告
    warning: {
      primary: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },

    // 錯誤
    error: {
      primary: '#EF4444',
      light: '#FCA5A5',
      dark: '#DC2626',
    },

    // 資訊
    info: {
      primary: '#3B82F6',
      light: '#93C5FD',
      dark: '#2563EB',
    },
  },

  // 情緒色彩（用於情緒圖標）
  moods: {
    happy: '#F9D71C',        // 明亮黃色
    calm: '#A8D5BA',         // 平靜綠色
    energetic: '#FF9F40',    // 活力橙色
    anxious: '#8FC4E8',      // 焦慮藍色
    sad: '#6B8CAE',          // 憂傷藍灰
    irritable: '#E89E8F',    // 易怒珊瑚紅
    tired: '#C5A8D5',        // 疲倦紫色
  },

  // 背景
  background: {
    primary: '#F5F1ED',      // 主背景（溫暖米色）
    secondary: '#FAFAF9',    // 次要背景（接近白色）
    tertiary: '#FFFFFF',     // 卡片背景
    overlay: 'rgba(0, 0, 0, 0.5)',  // 遮罩
  },

  // 文字
  text: {
    primary: '#1A1A1A',      // 主要文字
    secondary: '#525252',    // 次要文字
    tertiary: '#A3A3A3',     // 三級文字
    inverse: '#FFFFFF',      // 反色文字（深色背景用）
    disabled: '#D4D4D4',     // 禁用文字
  },

  // 邊框
  border: {
    light: '#F5F5F5',
    medium: '#E5E5E5',
    dark: '#D4D4D4',
  },

  // 特殊用途
  shadow: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

/**
 * 根據階段獲取顏色
 */
export const getPhaseColors = (phase: string) => {
  switch (phase.toLowerCase()) {
    case 'menstrual':
      return colors.phases.menstrual;
    case 'follicular':
      return colors.phases.follicular;
    case 'ovulatory':
      return colors.phases.ovulatory;
    case 'luteal_early':
      return colors.phases.lutealEarly;
    case 'luteal_late':
      return colors.phases.lutealLate;
    default:
      return colors.phases.menstrual;
  }
};

export type Colors = typeof colors;

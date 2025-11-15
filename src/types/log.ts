/**
 * 每日記錄類型定義
 * Daily log type definitions
 */

export enum FlowLevel {
  NONE = 'none',
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy'
}

export enum PainLevel {
  NONE = 'none',
  MILD = 'mild',
  MODERATE = 'moderate',
  SEVERE = 'severe'
}

export enum MoodType {
  HAPPY = 'happy',
  CALM = 'calm',
  ENERGETIC = 'energetic',
  ANXIOUS = 'anxious',
  SAD = 'sad',
  IRRITABLE = 'irritable',
  TIRED = 'tired'
}

export enum SymptomTag {
  HEADACHE = 'headache',
  LOW_ENERGY = 'low_energy',
  CRAVINGS = 'cravings',
  BLOATING = 'bloating',
  TENDER_BREASTS = 'tender_breasts',
  ACNE = 'acne',
  INSOMNIA = 'insomnia',
  BACK_PAIN = 'back_pain',
  NAUSEA = 'nausea'
}

export interface DailyLog {
  id: string;
  userId: string;
  date: Date;                  // 記錄的日期（日期部分，無時間）

  // 生理數據
  flow?: FlowLevel;
  pain?: PainLevel;

  // 情緒（可多選）
  moods: MoodType[];

  // 症狀標籤（可多選）
  symptoms: SymptomTag[];

  // 私密筆記（永不與伴侶分享）
  privateNotes?: string;

  // 能量水平 (1-5)
  energyLevel?: number;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * 伴侶可見的簡化版本（根據分享等級）
 */
export interface PartnerVisibleLog {
  date: Date;
  phase: string;               // 階段名稱
  cycleDay: number;

  // BASIC 等級：只有階段
  // DETAILED 等級：包含以下欄位
  hasLowEnergy?: boolean;      // 是否低能量
  hasPain?: boolean;           // 是否有疼痛
  generalMood?: 'positive' | 'neutral' | 'challenging';  // 整體情緒
}

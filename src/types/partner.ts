/**
 * 伴侶相關類型定義
 * Partner-related type definitions
 */

export enum CaringActionType {
  // 實際行動
  PREPARED_MEAL = 'prepared_meal',
  OFFERED_MASSAGE = 'offered_massage',
  BROUGHT_SUPPLIES = 'brought_supplies',
  GAVE_SPACE = 'gave_space',
  PLANNED_QUIET_TIME = 'planned_quiet_time',
  EXPRESSED_SUPPORT = 'expressed_support',
  DID_CHORES = 'did_chores',
  BROUGHT_COMFORT_FOOD = 'brought_comfort_food',

  // 情感支持
  LISTENED = 'listened',
  CHECKED_IN = 'checked_in',
  SENT_MESSAGE = 'sent_message',

  // 自定義
  CUSTOM = 'custom'
}

export interface CaringAction {
  id: string;
  partnerId: string;
  herUserId: string;
  date: Date;
  actionType: CaringActionType;
  customNote?: string;          // 用於 CUSTOM 類型
  createdAt: Date;
}

export interface CaringCard {
  id: string;
  fromPartnerId: string;
  toHerUserId: string;
  message: string;
  cardStyle: CaringCardStyle;
  sentAt: Date;
  readAt?: Date;
}

export enum CaringCardStyle {
  GENTLE = 'gentle',           // 溫柔風格
  SUPPORTIVE = 'supportive',   // 支持風格
  CHEERFUL = 'cheerful',       // 開朗風格
  CALM = 'calm'                // 平靜風格
}

/**
 * 伴侶今日建議
 */
export interface PartnerSuggestion {
  phase: string;
  cycleDay: number;

  // 階段說明
  phaseExplanation: string;    // "她可能感到..."

  // 建議的關懷行動（1-2個）
  suggestedActions: string[];

  // 要注意的事項
  thingsToWatch: string[];

  // 要避免的事項
  thingsToAvoid?: string[];
}

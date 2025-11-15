/**
 * 用戶類型定義
 * User type definitions
 */

export enum UserRole {
  HER = 'her',        // 主要用戶（女性）
  PARTNER = 'partner' // 伴侶
}

export enum AuthProvider {
  EMAIL = 'email',
  APPLE = 'apple'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;

  // 配對相關
  partnerId?: string;           // 伴侶的用戶 ID
  pairingCode?: string;         // 配對碼（僅限 Her）
  pairingCodeExpiresAt?: Date;  // 配對碼過期時間

  // 偏好設定
  notificationsEnabled: boolean;
  preferredLanguage: 'en' | 'zh-TW';

  // Her 專用欄位
  herSettings?: HerSettings;

  // Partner 專用欄位
  partnerSettings?: PartnerSettings;
}

export interface HerSettings {
  // 分享設定
  sharingEnabled: boolean;
  sharingLevel: SharingLevel;

  // 週期偏好
  averageCycleLength?: number;    // 平均週期長度（天）
  averagePeriodLength?: number;   // 平均經期長度（天）
  trackFertileWindow: boolean;    // 是否追蹤排卵期

  // 提醒設定
  periodReminderDaysBefore: number;  // 經期前幾天提醒
  dailyLogReminderTime?: string;     // 每日記錄提醒時間 (HH:mm)
}

export enum SharingLevel {
  BASIC = 'basic',       // 僅分享階段 + 日期 + 建議
  DETAILED = 'detailed'  // 包含高層級標籤（如「比平常更累」）
}

export interface PartnerSettings {
  // 提醒設定
  phaseChangeNotifications: boolean;  // 階段變化通知
  dailySummaryTime?: string;          // 每日摘要時間 (HH:mm)

  // 記錄偏好
  trackCaringActions: boolean;        // 是否記錄關懷行動
}

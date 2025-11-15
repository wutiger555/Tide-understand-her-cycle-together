/**
 * 配對相關類型定義
 * Pairing-related type definitions
 */

export interface PairingCode {
  code: string;                // 6位數字碼
  herUserId: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
  usedBy?: string;             // 伴侶的用戶 ID
  usedAt?: Date;
}

export interface PairingRequest {
  id: string;
  code: string;
  partnerUserId: string;
  herUserId: string;
  status: PairingStatus;
  createdAt: Date;
  resolvedAt?: Date;
}

export enum PairingStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface UnpairRequest {
  userId: string;              // 發起解除配對的用戶
  partnerId: string;           // 被解除配對的用戶
  reason?: string;
  timestamp: Date;
}

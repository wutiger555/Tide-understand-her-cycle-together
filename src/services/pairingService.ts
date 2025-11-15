/**
 * Pairing Service
 * 配對服務 - 處理伴侶配對邏輯
 */

import * as Crypto from 'expo-crypto';
import { addHours } from 'date-fns';
import { PairingCode } from '@types/pairing';

/**
 * 生成 6 位數配對碼
 */
export function generatePairingCode(): string {
  // 生成 6 位數字碼（100000-999999）
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

/**
 * 創建配對碼（給 Her）
 * @param userId - Her 的用戶 ID
 * @param expiryHours - 配對碼有效時數（預設 24 小時）
 */
export async function createPairingCode(
  userId: string,
  expiryHours: number = 24
): Promise<PairingCode> {
  const code = generatePairingCode();
  const now = new Date();
  const expiresAt = addHours(now, expiryHours);

  const pairingCode: PairingCode = {
    code,
    herUserId: userId,
    createdAt: now,
    expiresAt,
    isUsed: false,
  };

  // TODO: 實際實作中，這裡會將配對碼存儲到後端
  // 現在先返回配對碼物件

  return pairingCode;
}

/**
 * 驗證配對碼
 * @param code - 配對碼
 * @returns 驗證結果和配對碼資訊
 */
export async function validatePairingCode(code: string): Promise<{
  valid: boolean;
  pairingCode?: PairingCode;
  error?: string;
}> {
  // TODO: 實際實作中，這裡會從後端獲取並驗證配對碼

  // 檢查格式
  if (!/^\d{6}$/.test(code)) {
    return {
      valid: false,
      error: 'Invalid code format. Code must be 6 digits.',
    };
  }

  // 模擬查找配對碼
  // const pairingCode = await fetchPairingCodeFromBackend(code);

  // 檢查是否存在
  // if (!pairingCode) {
  //   return {
  //     valid: false,
  //     error: 'Code not found or has expired.',
  //   };
  // }

  // 檢查是否過期
  // if (new Date() > pairingCode.expiresAt) {
  //   return {
  //     valid: false,
  //     error: 'Code has expired.',
  //   };
  // }

  // 檢查是否已使用
  // if (pairingCode.isUsed) {
  //   return {
  //     valid: false,
  //     error: 'Code has already been used.',
  //   };
  // }

  // 暫時返回成功
  return {
    valid: true,
    // pairingCode,
  };
}

/**
 * 使用配對碼完成配對
 * @param code - 配對碼
 * @param partnerId - Partner 的用戶 ID
 */
export async function completePairing(
  code: string,
  partnerId: string
): Promise<{
  success: boolean;
  herUserId?: string;
  error?: string;
}> {
  // 驗證配對碼
  const validation = await validatePairingCode(code);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // TODO: 實際實作中，這裡會：
  // 1. 標記配對碼為已使用
  // 2. 更新 Her 的 partnerId
  // 3. 更新 Partner 的 partnerId
  // 4. 創建配對記錄

  return {
    success: true,
    // herUserId: validation.pairingCode!.herUserId,
  };
}

/**
 * 解除配對
 * @param userId - 發起解除配對的用戶 ID
 * @param partnerId - 伴侶的用戶 ID
 */
export async function unpair(
  userId: string,
  partnerId: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  // TODO: 實際實作中，這裡會：
  // 1. 清除兩個用戶的 partnerId
  // 2. 更新分享設定
  // 3. 創建解除配對記錄

  return {
    success: true,
  };
}

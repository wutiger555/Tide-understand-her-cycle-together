/**
 * 用戶狀態管理
 * User state management with Zustand
 */

import { create } from 'zustand';
import { User, UserRole } from '@types/user';

interface UserState {
  // 狀態
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // 動作
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;

  // 配對相關
  setPairingCode: (code: string, expiresAt: Date) => void;
  clearPairingCode: () => void;
  linkPartner: (partnerId: string) => void;
  unlinkPartner: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  // 初始狀態
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // 設置用戶
  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    isLoading: false
  }),

  // 更新用戶資訊
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),

  // 登出
  logout: () => set({
    user: null,
    isAuthenticated: false
  }),

  // 設置配對碼（僅 Her）
  setPairingCode: (code, expiresAt) => set((state) => ({
    user: state.user ? {
      ...state.user,
      pairingCode: code,
      pairingCodeExpiresAt: expiresAt,
    } : null,
  })),

  // 清除配對碼
  clearPairingCode: () => set((state) => ({
    user: state.user ? {
      ...state.user,
      pairingCode: undefined,
      pairingCodeExpiresAt: undefined,
    } : null,
  })),

  // 連結伴侶
  linkPartner: (partnerId) => set((state) => ({
    user: state.user ? {
      ...state.user,
      partnerId,
    } : null,
  })),

  // 解除配對
  unlinkPartner: () => set((state) => ({
    user: state.user ? {
      ...state.user,
      partnerId: undefined,
    } : null,
  })),
}));

/**
 * Selectors（選擇器）- 用於派生狀態
 */
export const selectIsHer = (state: UserState) =>
  state.user?.role === UserRole.HER;

export const selectIsPartner = (state: UserState) =>
  state.user?.role === UserRole.PARTNER;

export const selectIsPaired = (state: UserState) =>
  !!state.user?.partnerId;

export const selectHasPairingCode = (state: UserState) =>
  !!state.user?.pairingCode;

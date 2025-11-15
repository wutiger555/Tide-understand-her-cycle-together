/**
 * 伴侶狀態管理
 * Partner state management
 */

import { create } from 'zustand';
import { CaringAction, CaringCard, PartnerSuggestion } from '@types/partner';
import { PartnerVisibleLog } from '@types/log';

interface PartnerState {
  // 狀態
  partnerVisibleData: PartnerVisibleLog | null;  // 今日可見數據
  suggestions: PartnerSuggestion | null;          // 今日建議
  caringActions: CaringAction[];                  // 關懷行動歷史
  caringCards: CaringCard[];                      // 關懷卡片歷史
  unreadCards: number;                            // 未讀卡片數

  // 動作
  setPartnerVisibleData: (data: PartnerVisibleLog | null) => void;
  setSuggestions: (suggestions: PartnerSuggestion | null) => void;

  addCaringAction: (action: CaringAction) => void;
  setCaringActions: (actions: CaringAction[]) => void;

  sendCaringCard: (card: CaringCard) => void;
  setCaringCards: (cards: CaringCard[]) => void;
  markCardAsRead: (cardId: string) => void;
}

export const usePartnerStore = create<PartnerState>((set) => ({
  // 初始狀態
  partnerVisibleData: null,
  suggestions: null,
  caringActions: [],
  caringCards: [],
  unreadCards: 0,

  // 設置伴侶可見數據
  setPartnerVisibleData: (data) => set({ partnerVisibleData: data }),

  // 設置建議
  setSuggestions: (suggestions) => set({ suggestions }),

  // 新增關懷行動
  addCaringAction: (action) => set((state) => ({
    caringActions: [action, ...state.caringActions],
  })),

  // 設置關懷行動列表
  setCaringActions: (actions) => set({ caringActions: actions }),

  // 發送關懷卡片
  sendCaringCard: (card) => set((state) => ({
    caringCards: [card, ...state.caringCards],
  })),

  // 設置關懷卡片列表
  setCaringCards: (cards) => {
    const unreadCount = cards.filter(c => !c.readAt).length;
    set({
      caringCards: cards,
      unreadCards: unreadCount,
    });
  },

  // 標記卡片已讀
  markCardAsRead: (cardId) => set((state) => ({
    caringCards: state.caringCards.map(card =>
      card.id === cardId ? { ...card, readAt: new Date() } : card
    ),
    unreadCards: Math.max(0, state.unreadCards - 1),
  })),
}));

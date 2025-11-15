/**
 * 洞察狀態管理
 * Insights state management
 */

import { create } from 'zustand';
import { CycleInsights, SymptomDetail } from '@types/insights';

interface InsightsState {
  // 狀態
  insights: CycleInsights | null;
  symptomDetails: Record<string, SymptomDetail>;
  isLoading: boolean;

  // 動作
  setInsights: (insights: CycleInsights | null) => void;
  setSymptomDetail: (symptom: string, detail: SymptomDetail) => void;
  refreshInsights: () => Promise<void>;
}

export const useInsightsStore = create<InsightsState>((set) => ({
  // 初始狀態
  insights: null,
  symptomDetails: {},
  isLoading: false,

  // 設置洞察
  setInsights: (insights) => set({ insights }),

  // 設置症狀詳情
  setSymptomDetail: (symptom, detail) => set((state) => ({
    symptomDetails: {
      ...state.symptomDetails,
      [symptom]: detail,
    },
  })),

  // 重新計算洞察（這裡是占位符，實際會調用服務）
  refreshInsights: async () => {
    set({ isLoading: true });
    // TODO: 調用計算服務
    set({ isLoading: false });
  },
}));

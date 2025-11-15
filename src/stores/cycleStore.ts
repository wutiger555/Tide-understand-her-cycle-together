/**
 * 週期狀態管理
 * Cycle state management
 */

import { create } from 'zustand';
import { Period, CycleDay, CyclePrediction } from '@types/cycle';
import { DailyLog } from '@types/log';

interface CycleState {
  // 狀態
  periods: Period[];
  currentPeriod: Period | null;
  dailyLogs: DailyLog[];
  prediction: CyclePrediction | null;
  isLoading: boolean;

  // 動作
  setPeriods: (periods: Period[]) => void;
  addPeriod: (period: Period) => void;
  updatePeriod: (id: string, updates: Partial<Period>) => void;
  endCurrentPeriod: (endDate: Date) => void;

  setDailyLogs: (logs: DailyLog[]) => void;
  addDailyLog: (log: DailyLog) => void;
  updateDailyLog: (id: string, updates: Partial<DailyLog>) => void;
  getDailyLog: (date: Date) => DailyLog | undefined;

  setPrediction: (prediction: CyclePrediction | null) => void;

  // 工具函數
  getCurrentCycleDay: () => CycleDay | null;
  getLastPeriod: () => Period | null;
}

export const useCycleStore = create<CycleState>((set, get) => ({
  // 初始狀態
  periods: [],
  currentPeriod: null,
  dailyLogs: [],
  prediction: null,
  isLoading: true,

  // 設置經期列表
  setPeriods: (periods) => {
    const sortedPeriods = [...periods].sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
    );
    const currentPeriod = sortedPeriods.find(p => !p.endDate) || null;

    set({
      periods: sortedPeriods,
      currentPeriod,
      isLoading: false
    });
  },

  // 新增經期
  addPeriod: (period) => set((state) => {
    const newPeriods = [period, ...state.periods].sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
    );
    return {
      periods: newPeriods,
      currentPeriod: !period.endDate ? period : state.currentPeriod,
    };
  }),

  // 更新經期
  updatePeriod: (id, updates) => set((state) => ({
    periods: state.periods.map(p =>
      p.id === id ? { ...p, ...updates } : p
    ),
    currentPeriod: state.currentPeriod?.id === id
      ? { ...state.currentPeriod, ...updates }
      : state.currentPeriod,
  })),

  // 結束當前經期
  endCurrentPeriod: (endDate) => set((state) => {
    if (!state.currentPeriod) return state;

    const updatedPeriod = {
      ...state.currentPeriod,
      endDate,
      periodLength: Math.ceil(
        (endDate.getTime() - state.currentPeriod.startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1,
    };

    return {
      periods: state.periods.map(p =>
        p.id === state.currentPeriod!.id ? updatedPeriod : p
      ),
      currentPeriod: null,
    };
  }),

  // 設置每日記錄
  setDailyLogs: (logs) => set({ dailyLogs: logs }),

  // 新增每日記錄
  addDailyLog: (log) => set((state) => ({
    dailyLogs: [log, ...state.dailyLogs],
  })),

  // 更新每日記錄
  updateDailyLog: (id, updates) => set((state) => ({
    dailyLogs: state.dailyLogs.map(log =>
      log.id === id ? { ...log, ...updates } : log
    ),
  })),

  // 獲取特定日期的記錄
  getDailyLog: (date) => {
    const state = get();
    const dateStr = date.toISOString().split('T')[0];
    return state.dailyLogs.find(log => {
      const logDateStr = log.date.toISOString().split('T')[0];
      return logDateStr === dateStr;
    });
  },

  // 設置預測
  setPrediction: (prediction) => set({ prediction }),

  // 獲取當前週期日
  getCurrentCycleDay: () => {
    const state = get();
    const lastPeriod = state.getLastPeriod();
    if (!lastPeriod) return null;

    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - lastPeriod.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // TODO: 實作完整的 CycleDay 計算
    return null;
  },

  // 獲取最後一次經期
  getLastPeriod: () => {
    const state = get();
    if (state.periods.length === 0) return null;
    return state.periods[0]; // 已經按日期排序
  },
}));

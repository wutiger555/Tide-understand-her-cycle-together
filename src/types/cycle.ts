/**
 * 週期與經期類型定義
 * Cycle and period type definitions
 */

export enum CyclePhase {
  MENSTRUAL = 'menstrual',       // 月經期（Day 1-5）
  FOLLICULAR = 'follicular',     // 濾泡期（Day 6-13）
  OVULATORY = 'ovulatory',       // 排卵期（Day 14-16）
  LUTEAL_EARLY = 'luteal_early', // 黃體前期（Day 17-22）
  LUTEAL_LATE = 'luteal_late'    // 黃體後期（Day 23-28+）
}

export interface Period {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;              // 如果尚未結束則為 undefined
  cycleLength?: number;        // 從上次經期開始到這次開始的天數
  periodLength?: number;       // 經期長度（天）
  isConfirmed: boolean;        // 是否為實際記錄（vs 預測）
  createdAt: Date;
  updatedAt: Date;
}

export interface CycleDay {
  date: Date;
  cycleDay: number;            // 週期中的第幾天（1-based）
  phase: CyclePhase;
  periodId?: string;           // 如果這天在經期中
  isPredicted: boolean;        // 是否為預測數據
}

export interface CyclePrediction {
  userId: string;
  nextPeriodStartDate: Date;
  nextPeriodEndDate: Date;
  confidence: number;          // 0-1，預測信心度
  fertileWindowStart?: Date;
  fertileWindowEnd?: Date;
  calculatedAt: Date;
  basedOnPeriods: string[];    // 用於計算的經期 ID 陣列
}

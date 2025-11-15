/**
 * 週期計算工具
 * Cycle calculation utilities
 */

import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { Period, CyclePhase, CycleDay, CyclePrediction } from '@types/cycle';

/**
 * 計算平均週期長度
 * Calculate average cycle length from historical periods
 */
export function calculateAverageCycleLength(periods: Period[]): number | null {
  // 需要至少兩個經期來計算週期長度
  if (periods.length < 2) return null;

  // 只使用有 cycleLength 的經期
  const cycleLengths = periods
    .filter(p => p.cycleLength !== undefined)
    .map(p => p.cycleLength!);

  if (cycleLengths.length === 0) return null;

  const sum = cycleLengths.reduce((acc, len) => acc + len, 0);
  return Math.round(sum / cycleLengths.length);
}

/**
 * 計算平均經期長度
 * Calculate average period length
 */
export function calculateAveragePeriodLength(periods: Period[]): number | null {
  const periodLengths = periods
    .filter(p => p.periodLength !== undefined)
    .map(p => p.periodLength!);

  if (periodLengths.length === 0) return null;

  const sum = periodLengths.reduce((acc, len) => acc + len, 0);
  return Math.round(sum / periodLengths.length);
}

/**
 * 計算週期長度變異數
 * Calculate cycle length variance (for regularity)
 */
export function calculateCycleLengthVariance(periods: Period[]): number {
  const cycleLengths = periods
    .filter(p => p.cycleLength !== undefined)
    .map(p => p.cycleLength!);

  if (cycleLengths.length < 2) return 0;

  const mean = cycleLengths.reduce((acc, len) => acc + len, 0) / cycleLengths.length;
  const squaredDiffs = cycleLengths.map(len => Math.pow(len - mean, 2));
  const variance = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / cycleLengths.length;

  return Math.sqrt(variance); // 標準差
}

/**
 * 預測下次經期
 * Predict next period based on recent cycles
 *
 * @param periods - 歷史經期記錄（已排序，最新的在前）
 * @param minCycles - 最少需要幾個週期來預測（預設 3）
 * @returns 預測結果或 null
 */
export function predictNextPeriod(
  periods: Period[],
  minCycles: number = 3
): CyclePrediction | null {
  // 至少需要 minCycles 個完整週期
  if (periods.length < minCycles) return null;

  const recentPeriods = periods.slice(0, 6); // 使用最近 6 個週期
  const avgCycleLength = calculateAverageCycleLength(recentPeriods);
  const avgPeriodLength = calculateAveragePeriodLength(recentPeriods);

  if (!avgCycleLength || !avgPeriodLength) return null;

  // 最後一次經期開始日期
  const lastPeriod = periods[0];
  const lastPeriodStart = startOfDay(lastPeriod.startDate);

  // 預測下次經期開始日期
  const nextPeriodStart = addDays(lastPeriodStart, avgCycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, avgPeriodLength - 1);

  // 計算信心度（基於規律性）
  const variance = calculateCycleLengthVariance(recentPeriods);
  let confidence = 1.0;

  if (variance < 2) {
    confidence = 0.95; // 非常規律
  } else if (variance < 4) {
    confidence = 0.85; // 規律
  } else if (variance < 7) {
    confidence = 0.70; // 有些不規律
  } else {
    confidence = 0.50; // 不規律
  }

  return {
    userId: lastPeriod.userId,
    nextPeriodStartDate: nextPeriodStart,
    nextPeriodEndDate: nextPeriodEnd,
    confidence,
    calculatedAt: new Date(),
    basedOnPeriods: recentPeriods.map(p => p.id),
  };
}

/**
 * 預測排卵期
 * Predict fertile window (typically day 10-16 of cycle)
 */
export function predictFertileWindow(
  lastPeriodStart: Date,
  avgCycleLength: number
): { start: Date; end: Date } | null {
  // 排卵通常發生在下次經期前 14 天
  // 受孕窗口通常是排卵前 5 天到排卵當天

  const ovulationDay = avgCycleLength - 14;
  const fertileStart = addDays(lastPeriodStart, Math.max(1, ovulationDay - 5));
  const fertileEnd = addDays(lastPeriodStart, ovulationDay);

  return {
    start: fertileStart,
    end: fertileEnd,
  };
}

/**
 * 根據週期日判斷階段
 * Determine cycle phase based on cycle day
 *
 * @param cycleDay - 週期中的第幾天（1-based）
 * @param avgCycleLength - 平均週期長度
 * @returns 階段
 */
export function getCyclePhase(cycleDay: number, avgCycleLength: number = 28): CyclePhase {
  // 預設為 28 天週期的階段劃分
  // 月經期: Day 1-5
  // 濾泡期: Day 6-13
  // 排卵期: Day 14-16
  // 黃體前期: Day 17-22
  // 黃體後期: Day 23-28+

  if (cycleDay <= 5) {
    return CyclePhase.MENSTRUAL;
  } else if (cycleDay <= 13) {
    return CyclePhase.FOLLICULAR;
  } else if (cycleDay <= 16) {
    return CyclePhase.OVULATORY;
  } else if (cycleDay <= 22) {
    return CyclePhase.LUTEAL_EARLY;
  } else {
    return CyclePhase.LUTEAL_LATE;
  }
}

/**
 * 計算今天是週期的第幾天
 * Calculate current cycle day
 */
export function getCurrentCycleDay(
  lastPeriodStart: Date,
  today: Date = new Date()
): number {
  const daysSinceStart = differenceInDays(startOfDay(today), startOfDay(lastPeriodStart));
  return daysSinceStart + 1; // 1-based
}

/**
 * 獲取今天的週期資訊
 * Get today's cycle information
 */
export function getTodayCycleInfo(
  periods: Period[],
  today: Date = new Date()
): CycleDay | null {
  if (periods.length === 0) return null;

  const lastPeriod = periods[0];
  const cycleDay = getCurrentCycleDay(lastPeriod.startDate, today);

  // 如果超過合理範圍（60天），可能需要新的經期記錄
  if (cycleDay > 60) return null;

  const avgCycleLength = calculateAverageCycleLength(periods) || 28;
  const phase = getCyclePhase(cycleDay, avgCycleLength);

  // 檢查今天是否在經期中
  const isPeriodDay = lastPeriod.endDate
    ? today >= lastPeriod.startDate && today <= lastPeriod.endDate
    : cycleDay <= 5; // 預估經期長度

  return {
    date: startOfDay(today),
    cycleDay,
    phase,
    periodId: isPeriodDay ? lastPeriod.id : undefined,
    isPredicted: !isPeriodDay,
  };
}

/**
 * 計算兩個日期之間的所有週期日
 * Calculate all cycle days between two dates
 */
export function getCycleDaysInRange(
  periods: Period[],
  startDate: Date,
  endDate: Date
): CycleDay[] {
  if (periods.length === 0) return [];

  const cycleDays: CycleDay[] = [];
  let currentDate = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (currentDate <= end) {
    const cycleDay = getTodayCycleInfo(periods, currentDate);
    if (cycleDay) {
      cycleDays.push(cycleDay);
    }
    currentDate = addDays(currentDate, 1);
  }

  return cycleDays;
}

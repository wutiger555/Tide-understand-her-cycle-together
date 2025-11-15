/**
 * 日期工具函數
 * Date utility functions
 */

import { format, isToday, isYesterday, isTomorrow, startOfDay, endOfDay } from 'date-fns';

/**
 * 格式化日期為友善字串
 */
export function formatFriendlyDate(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';

  // 格式：Jan 15
  return format(date, 'MMM d');
}

/**
 * 格式化日期為完整字串
 */
export function formatFullDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

/**
 * 格式化日期為月/日
 */
export function formatShortDate(date: Date): string {
  return format(date, 'M/d');
}

/**
 * 檢查兩個日期是否為同一天
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}

/**
 * 獲取今天的開始和結束時間
 */
export function getTodayRange(): { start: Date; end: Date } {
  const today = new Date();
  return {
    start: startOfDay(today),
    end: endOfDay(today),
  };
}

/**
 * 格式化天數差異為友善字串
 */
export function formatDaysUntil(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

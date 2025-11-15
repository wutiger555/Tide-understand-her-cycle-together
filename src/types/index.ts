/**
 * 統一導出所有類型
 * Centralized type exports
 */

export * from './user';
export * from './cycle';
export * from './log';
export * from './partner';
export * from './insights';
export * from './pairing';

/**
 * 通用工具類型
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

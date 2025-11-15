/**
 * 洞察與分析類型定義
 * Insights and analytics type definitions
 */

export interface CycleInsights {
  userId: string;
  calculatedAt: Date;
  basedOnCycles: number;       // 基於多少個週期計算

  // 週期統計
  averageCycleLength: number;
  cycleLengthVariance: number; // 變異數

  // 經期統計
  averagePeriodLength: number;
  periodLengthVariance: number;

  // 規律性
  regularity: RegularityLevel;
  regularityScore: number;     // 0-100

  // 症狀模式
  commonSymptoms: SymptomPattern[];

  // 情緒模式
  moodPatterns: MoodPattern[];
}

export enum RegularityLevel {
  VERY_REGULAR = 'very_regular',     // 變異 < 2 天
  REGULAR = 'regular',               // 變異 2-4 天
  SOMEWHAT_IRREGULAR = 'somewhat_irregular',  // 變異 4-7 天
  IRREGULAR = 'irregular'            // 變異 > 7 天
}

export interface SymptomPattern {
  symptom: string;
  frequency: number;           // 0-1，在有效週期中出現的比例
  typicalCycleDays: number[];  // 通常在週期的哪幾天出現
  averageSeverity?: number;    // 如果適用
}

export interface MoodPattern {
  mood: string;
  frequency: number;
  typicalPhases: string[];     // 通常在哪些階段出現
}

/**
 * 單一症狀的詳細分析
 */
export interface SymptomDetail {
  symptom: string;
  totalOccurrences: number;
  lastOccurrence?: Date;

  // 在週期中的分佈
  cycleDistribution: {
    cycleDay: number;
    occurrences: number;
  }[];

  // 趨勢
  trend: 'increasing' | 'stable' | 'decreasing';
}

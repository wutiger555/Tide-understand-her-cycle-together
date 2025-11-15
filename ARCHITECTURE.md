# Tide App - 架構設計文檔

## 一、架構總覽

### 1.1 技術決策

| 決策點 | 選擇 | 理由 |
|--------|------|------|
| **框架** | React Native + Expo | 快速開發、豐富的生態系統、優秀的 iOS 支持 |
| **語言** | TypeScript（嚴格模式）| 類型安全、更好的開發體驗、減少運行時錯誤 |
| **導航** | Expo Router | 基於檔案系統、TypeScript 支持、現代化的路由方案 |
| **狀態管理** | Zustand | 輕量級、簡單易用、無樣板代碼、優秀的 TypeScript 支持 |
| **日期處理** | date-fns | 輕量、模組化、函數式、Tree-shakeable |
| **樣式方案** | StyleSheet + Design Tokens | 性能優秀、類型安全、統一設計語言 |

### 1.2 架構分層

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (React Components + Expo Router)   │
├─────────────────────────────────────┤
│         State Management            │
│      (Zustand Stores)               │
├─────────────────────────────────────┤
│       Business Logic Layer          │
│  (Utils + Services)                 │
├─────────────────────────────────────┤
│        Data Layer (v1)              │
│  (AsyncStorage - Local Storage)     │
└─────────────────────────────────────┘
```

## 二、資料流設計

### 2.1 狀態管理策略

#### Her 的資料流

```
User Action (記錄經期/症狀)
    ↓
Component Handler
    ↓
cycleStore.addDailyLog()
    ↓
Update Local State
    ↓
Trigger Calculation
    ↓
Update Prediction (if needed)
    ↓
Schedule Notifications
    ↓
UI Re-render
```

#### Partner 的資料流

```
Partner opens app
    ↓
Check pairing status
    ↓
Fetch partner-visible data
    ↓
Calculate today's suggestions
    ↓
partnerStore.setSuggestions()
    ↓
Display guidance
```

### 2.2 Store 職責劃分

#### userStore
- **職責**: 用戶認證、配對狀態、用戶設定
- **關鍵狀態**:
  - `user: User | null` - 當前用戶
  - `isAuthenticated: boolean` - 認證狀態
  - `isLoading: boolean` - 加載狀態

#### cycleStore
- **職責**: 週期數據、每日記錄、預測
- **關鍵狀態**:
  - `periods: Period[]` - 歷史經期記錄
  - `dailyLogs: DailyLog[]` - 每日記錄
  - `prediction: CyclePrediction | null` - 預測數據

#### partnerStore
- **職責**: 伴侶視圖數據、建議、關懷行動
- **關鍵狀態**:
  - `partnerVisibleData: PartnerVisibleLog | null` - 今日可見數據
  - `suggestions: PartnerSuggestion | null` - 今日建議
  - `caringActions: CaringAction[]` - 關懷行動歷史

#### insightsStore
- **職責**: 分析計算、洞察生成
- **關鍵狀態**:
  - `insights: CycleInsights | null` - 週期洞察
  - `symptomDetails: Record<string, SymptomDetail>` - 症狀詳情

## 三、導航架構

### 3.1 路由結構

```
/
├── (onboarding)/
│   ├── welcome
│   ├── role-selection
│   ├── her-setup
│   └── partner-pairing
│
├── (her)/                 # Tab Navigator
│   ├── home
│   ├── calendar
│   ├── insights
│   └── settings
│
└── (partner)/             # Tab Navigator
    ├── home
    ├── caring-actions
    ├── cards
    └── settings
```

### 3.2 導航守衛邏輯

```typescript
// app/index.tsx

function determineInitialRoute() {
  if (!isAuthenticated) {
    return '/(onboarding)/welcome';
  }

  if (user.role === 'her') {
    return '/(her)/home';
  }

  if (user.role === 'partner') {
    return '/(partner)/home';
  }
}
```

## 四、業務邏輯設計

### 4.1 週期預測算法

```typescript
/**
 * 預測策略：
 * 1. 使用最近 3-6 個完整週期
 * 2. 計算平均週期長度
 * 3. 計算標準差評估規律性
 * 4. 根據規律性調整信心度
 */

predictNextPeriod(periods) {
  // 至少需要 3 個週期
  if (periods.length < 3) return null;

  // 取最近 6 個
  const recentPeriods = periods.slice(0, 6);

  // 計算平均值
  const avgCycleLength = average(recentPeriods.map(p => p.cycleLength));

  // 計算標準差
  const stdDev = standardDeviation(recentPeriods.map(p => p.cycleLength));

  // 預測日期
  const nextStart = addDays(lastPeriod.startDate, avgCycleLength);

  // 計算信心度
  const confidence = calculateConfidence(stdDev);

  return {
    nextPeriodStartDate: nextStart,
    confidence,
    // ...
  };
}
```

### 4.2 階段判斷邏輯

```typescript
/**
 * 標準 28 天週期的階段劃分：
 * - Menstrual: Day 1-5
 * - Follicular: Day 6-13
 * - Ovulatory: Day 14-16
 * - Early Luteal: Day 17-22
 * - Late Luteal: Day 23-28+
 *
 * 對於非 28 天週期，會根據週期長度等比例調整
 */
```

### 4.3 伴侶可見數據過濾

```typescript
/**
 * 分享等級：
 *
 * BASIC:
 * - 週期階段
 * - 週期日數
 * - 階段描述
 * - 關懷建議
 *
 * DETAILED (額外包含):
 * - 高層級症狀標籤（如「比平常更累」）
 * - 整體情緒（正面/中性/挑戰）
 * - 疼痛程度（有/無）
 *
 * 永不分享：
 * - 私密筆記
 * - 具體症狀詳情
 * - 詳細情緒描述
 */
```

## 五、設計系統

### 5.1 色彩語義

```typescript
// 階段色彩設計原則：
// 1. 使用柔和、非飽和的色調
// 2. 每個階段有獨特但協調的配色
// 3. 避免刺眼或過於強烈的顏色
// 4. 確保文字可讀性（WCAG AA 標準）

phases: {
  menstrual: {
    primary: '#E89E8F',    // 柔和珊瑚紅
    light: '#F5D4CD',
    lighter: '#FBF0ED',
    text: '#8B4A3C',
  },
  // ...其他階段
}
```

### 5.2 間距系統

```typescript
// 8pt 網格系統
// - 所有間距必須是 4 的倍數
// - 主要使用 8, 16, 24, 32
// - 保持視覺節奏一致性

spacing: {
  xs: 4,   // 0.5 單位
  sm: 8,   // 1 單位
  md: 16,  // 2 單位（基礎單位）
  lg: 24,  // 3 單位
  xl: 32,  // 4 單位
}
```

### 5.3 字體階層

```typescript
// 字體大小遵循 1.25 比例尺
// h1: 36px
// h2: 30px
// h3: 24px
// h4: 20px
// body: 16px
// caption: 12px
```

## 六、性能優化策略

### 6.1 渲染優化

```typescript
// 1. 使用 Zustand selectors 避免不必要的重渲染
const isHer = useUserStore(selectIsHer);

// 2. 將大型列表使用 FlatList 替代 ScrollView
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
/>

// 3. 使用 React.memo 包裝純展示組件
export const ExpensiveComponent = React.memo(({ data }) => {
  // ...
});
```

### 6.2 數據優化

```typescript
// 1. 只載入必要的數據範圍
// 例如：只載入最近 6 個月的記錄

// 2. 懶加載洞察計算
// 只在用戶進入 Insights 頁面時計算

// 3. 快取計算結果
// 預測結果快取，直到有新數據時才重新計算
```

## 七、未來擴展點

### 7.1 後端整合準備

```typescript
// 當前使用 AsyncStorage，未來切換到 API 只需：
// 1. 在 services/ 中添加 apiClient.ts
// 2. 修改 store 中的數據獲取邏輯
// 3. 類型定義保持不變

// 示例：
// Before:
async function loadPeriods() {
  return await AsyncStorage.getItem('periods');
}

// After:
async function loadPeriods() {
  return await apiClient.get('/periods');
}
```

### 7.2 國際化準備

```typescript
// 架構已支持未來添加 i18n：
// 1. 所有用戶可見文字已集中在 phaseDescriptions.ts
// 2. 可輕鬆提取為翻譯文件
// 3. theme 中的設計 tokens 語言無關
```

### 7.3 功能擴展點

1. **HealthKit 整合**
   - 在 services/ 中添加 healthKitService.ts
   - 擴展 DailyLog 類型添加更多健康指標

2. **進階圖表**
   - 添加 react-native-svg 和 victory-native
   - 在 components/ 中創建圖表組件庫

3. **社群功能**
   - 添加新的 communityStore
   - 創建 (community) 路由組

## 八、測試策略（未來）

### 8.1 單元測試

```typescript
// utils/ 和 services/ 中的純函數
// 使用 Jest

describe('predictNextPeriod', () => {
  it('should predict next period based on average cycle length', () => {
    // ...
  });
});
```

### 8.2 組件測試

```typescript
// 使用 @testing-library/react-native
import { render, fireEvent } from '@testing-library/react-native';

test('Button renders correctly and responds to press', () => {
  // ...
});
```

### 8.3 E2E 測試

```typescript
// 使用 Detox 進行關鍵流程測試
// - 新手引導流程
// - 記錄經期流程
// - 配對流程
```

## 九、安全考量

### 9.1 數據安全

- 本地數據使用 AsyncStorage 加密存儲
- 配對碼有時效性（24小時）
- 敏感數據（私密筆記）永不分享

### 9.2 隱私控制

- 分享開關可隨時關閉
- 分享等級可調整
- 解除配對立即停止數據共享

### 9.3 未來安全增強

- 端到端加密
- 生物識別認證
- 審計日誌

---

**文檔版本**: v1.0
**最後更新**: 2025-01-15
**維護者**: Tide Development Team

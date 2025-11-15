# Tide – Understand Her Cycle Together

一個專為情侶設計的經期追蹤應用程式，幫助伴侶雙方以尊重、溫柔的方式理解並支持彼此度過她的自然生理週期。

## 專案概述

**Tide** 是一個 iOS 應用程式（v1），使用 React Native + Expo + TypeScript 開發。應用程式提供兩種使用角色：

- **Her（主要用戶）**: 追蹤經期、症狀、情緒和能量水平，獲得個人化的洞察和預測
- **Partner（次要用戶）**: 查看簡化、尊重的週期資訊，獲得關懷建議和行動提示

### 核心理念

- 🌊 **自然節奏**: Tide 象徵身體和情緒的自然起伏
- 🤝 **共同理解**: 為伴侶提供共同語言，促進溝通和支持
- 🔒 **隱私優先**: 她完全控制分享內容，可隨時停止分享
- ⚡ **無摩擦記錄**: 每日記錄只需 5-10 秒
- 💝 **尊重關懷**: 避免任何控制或物化的語調，專注於支持和同理心

## 技術架構

### 技術棧

- **框架**: React Native 0.74
- **開發平台**: Expo SDK 51
- **導航**: Expo Router（基於檔案系統的路由）
- **語言**: TypeScript（嚴格模式）
- **狀態管理**: Zustand
- **日期處理**: date-fns
- **通知**: Expo Notifications
- **樣式**: StyleSheet + 設計系統

### 專案結構

```
Tide-understand-her-cycle-together/
├── app/                          # Expo Router 路由（基於檔案系統）
│   ├── _layout.tsx              # 根佈局
│   ├── index.tsx                # 入口頁面（認證檢查）
│   ├── (onboarding)/            # 新手引導流程
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── role-selection.tsx
│   │   ├── her-setup.tsx
│   │   └── partner-pairing.tsx
│   ├── (her)/                   # Her 的應用流程（Tab 導航）
│   │   ├── _layout.tsx
│   │   ├── home.tsx             # Her 主畫面
│   │   ├── calendar.tsx         # 日曆視圖
│   │   ├── insights.tsx         # 洞察分析
│   │   └── settings.tsx         # 設定
│   └── (partner)/               # Partner 的應用流程（Tab 導航）
│       ├── _layout.tsx
│       ├── home.tsx             # Partner 主畫面
│       ├── caring-actions.tsx   # 關懷行動記錄
│       ├── cards.tsx            # 關懷卡片
│       └── settings.tsx         # 設定
│
├── src/
│   ├── types/                   # TypeScript 類型定義
│   │   ├── user.ts              # 用戶、角色、設定
│   │   ├── cycle.ts             # 週期、經期、預測
│   │   ├── log.ts               # 每日記錄、症狀、情緒
│   │   ├── partner.ts           # 伴侶功能（行動、卡片、建議）
│   │   ├── insights.ts          # 洞察、分析、模式
│   │   ├── pairing.ts           # 配對碼、配對請求
│   │   └── index.ts
│   │
│   ├── stores/                  # Zustand 狀態管理
│   │   ├── userStore.ts         # 用戶狀態（認證、配對）
│   │   ├── cycleStore.ts        # 週期狀態（經期、記錄、預測）
│   │   ├── partnerStore.ts      # 伴侶狀態（可見數據、建議）
│   │   ├── insightsStore.ts     # 洞察狀態
│   │   └── index.ts
│   │
│   ├── utils/                   # 工具函數
│   │   ├── cycleCalculations.ts # 週期計算（預測、階段判斷）
│   │   ├── phaseDescriptions.ts # 階段描述與建議
│   │   ├── dateUtils.ts         # 日期工具
│   │   └── index.ts
│   │
│   ├── services/                # 業務邏輯服務
│   │   ├── notificationService.ts # 本地通知管理
│   │   ├── pairingService.ts    # 配對邏輯
│   │   └── index.ts
│   │
│   ├── components/              # 可重用 UI 組件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   │
│   └── theme/                   # 設計系統
│       ├── colors.ts            # 色彩系統（階段色彩）
│       ├── typography.ts        # 字體系統
│       ├── spacing.ts           # 間距系統
│       ├── radius.ts            # 圓角系統
│       ├── shadows.ts           # 陰影系統
│       └── index.ts
│
├── assets/                      # 靜態資源（圖片、字體）
├── package.json
├── tsconfig.json
├── app.json                     # Expo 配置
└── babel.config.js
```

## 資料模型

### 核心類型

#### User（用戶）
```typescript
interface User {
  id: string;
  email: string;
  role: 'her' | 'partner';
  authProvider: 'email' | 'apple';
  partnerId?: string;              // 配對的伴侶 ID
  pairingCode?: string;            // 配對碼（僅 Her）
  herSettings?: HerSettings;
  partnerSettings?: PartnerSettings;
}
```

#### Period（經期）
```typescript
interface Period {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  cycleLength?: number;            // 從上次經期開始的天數
  periodLength?: number;           // 經期長度
  isConfirmed: boolean;
}
```

#### DailyLog（每日記錄）
```typescript
interface DailyLog {
  id: string;
  userId: string;
  date: Date;
  flow?: 'none' | 'light' | 'medium' | 'heavy';
  pain?: 'none' | 'mild' | 'moderate' | 'severe';
  moods: MoodType[];              // 可多選
  symptoms: SymptomTag[];         // 可多選
  privateNotes?: string;          // 私密筆記（不分享）
  energyLevel?: number;           // 1-5
}
```

#### CyclePrediction（週期預測）
```typescript
interface CyclePrediction {
  userId: string;
  nextPeriodStartDate: Date;
  nextPeriodEndDate: Date;
  confidence: number;             // 0-1
  fertileWindowStart?: Date;
  fertileWindowEnd?: Date;
}
```

### 階段系統

應用程式將週期分為 5 個階段，每個階段有獨特的顏色和描述：

1. **Menstrual Phase（月經期）** 🌊 - 柔和珊瑚紅
2. **Follicular Phase（濾泡期）** 🌱 - 柔和金色
3. **Ovulatory Phase（排卵期）** ✨ - 柔和綠色
4. **Early Luteal Phase（黃體前期）** 🌾 - 柔和天藍
5. **Late Luteal Phase（黃體後期）** 🌙 - 柔和紫色

## 狀態管理

### Zustand Stores

#### userStore
- 管理認證狀態
- 處理配對連結/解除連結
- 存儲用戶設定

#### cycleStore
- 管理經期記錄
- 存儲每日記錄
- 保存預測數據
- 計算當前週期日

#### partnerStore
- 管理伴侶可見數據
- 提供今日建議
- 記錄關懷行動和卡片

#### insightsStore
- 計算週期洞察
- 分析症狀模式
- 追蹤情緒趨勢

## 核心功能實作

### 1. 週期預測

```typescript
// src/utils/cycleCalculations.ts

// 基於最近 3-6 個週期預測下次經期
predictNextPeriod(periods, minCycles = 3)

// 計算平均週期長度
calculateAverageCycleLength(periods)

// 判斷當前階段
getCyclePhase(cycleDay, avgCycleLength)
```

### 2. 階段描述

```typescript
// src/utils/phaseDescriptions.ts

// 為 Her 提供階段資訊
getPhaseInfo(phase) // 返回描述、常見感受、自我照護建議

// 為 Partner 提供指導
getPartnerGuidance(phase) // 返回階段說明、建議行動、注意事項
```

### 3. 通知系統

```typescript
// src/services/notificationService.ts

// 經期即將開始提醒（Her）
schedulePeriodReminder(nextPeriodDate, daysBefore)

// 每日記錄提醒（Her）
scheduleDailyLogReminder(time)

// 階段變化通知（Partner）
schedulePhaseChangeNotification(phaseName, phaseDate)
```

### 4. 配對系統

```typescript
// src/services/pairingService.ts

// 生成 6 位數配對碼
generatePairingCode()

// 驗證配對碼
validatePairingCode(code)

// 完成配對
completePairing(code, partnerId)

// 解除配對
unpair(userId, partnerId)
```

## 設計系統

### 色彩

- **階段色彩**: 每個週期階段有專屬的柔和色調
- **中性色階**: 灰階用於文字和背景
- **語意色彩**: 成功、警告、錯誤、資訊
- **情緒色彩**: 7 種情緒對應的顏色

### 字體

- 使用系統字體（iOS San Francisco）
- 預定義樣式：h1-h4, subtitle, body, button, caption
- 嚴格的大小和行高規範

### 間距

- 基於 8pt 網格系統
- xs(4), sm(8), md(16), lg(24), xl(32), 2xl(40), 3xl(48)

## 用戶流程

### Her 的流程

1. **新手引導**
   - 歡迎畫面
   - 選擇角色（Her）
   - 輸入第一次經期日期
   - 設定偏好

2. **主要使用**
   - Home: 查看今日狀態、快速記錄、自我照護建議
   - Calendar: 視覺化週期日曆
   - Insights: 查看統計和模式
   - Settings: 管理配對、通知、偏好

3. **配對功能**
   - 生成配對碼
   - 分享給伴侶
   - 管理分享等級
   - 隨時停止分享

### Partner 的流程

1. **新手引導**
   - 歡迎畫面
   - 選擇角色（Partner）
   - 輸入配對碼
   - 完成配對

2. **主要使用**
   - Home: 查看今日指導、建議行動、注意事項
   - Actions: 記錄關懷行動
   - Cards: 發送關懷卡片
   - Settings: 管理通知偏好

## 開發指南

### 安裝

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm start

# 在 iOS 模擬器運行
npm run ios
```

### 開發規範

1. **TypeScript**
   - 使用嚴格模式
   - 所有組件和函數必須有類型定義
   - 避免使用 `any`

2. **組件**
   - 使用函數組件和 Hooks
   - 將可重用邏輯提取為自定義 Hooks
   - 保持組件單一職責

3. **樣式**
   - 使用 StyleSheet.create
   - 從 theme 導入設計 tokens
   - 避免行內樣式

4. **狀態管理**
   - 全域狀態使用 Zustand stores
   - 本地狀態使用 useState
   - 使用 selectors 優化性能

### 未來擴展（v2+）

以下功能不在 v1 範圍，但已考慮架構擴展性：

- [ ] HealthKit 整合
- [ ] 懷孕模式
- [ ] 高級分析和圖表
- [ ] 社群功能
- [ ] 多語言支持（已預留 i18n）
- [ ] Android 版本
- [ ] 後端 API 整合（目前使用本地存儲）
- [ ] 更多自定義選項

## 隱私與安全

### v1 實作

- 本地數據存儲（AsyncStorage）
- 配對碼有時效性（24小時）
- 分享等級控制
- 私密筆記永不分享

### 未來計劃

- 端到端加密
- 後端數據同步
- 雙因素認證
- 完整的資料導出/刪除

## 授權

本專案為私有專案。

## 作者

由 world-class senior React Native engineer 和 product-minded UI/UX designer 設計和開發。

---

**注意**: 這是 v1 的代碼骨架。許多功能標記為 `TODO`，需要進一步實作。當前版本專注於展示架構、類型系統、狀態管理和核心業務邏輯。

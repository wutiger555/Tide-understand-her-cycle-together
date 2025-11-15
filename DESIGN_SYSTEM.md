# Tide Design System

## 🎨 設計理念

### 核心原則

**1. 自然與流動**
- 使用波浪、潮汐的視覺隱喻
- 柔和的曲線和圓角
- 流暢的動畫轉場

**2. 極簡主義**
- 減少視覺噪音
- 突出關鍵資訊
- 留白的智慧運用

**3. 平靜與溫暖**
- 柔和、非飽和的配色
- 避免刺眼的對比
- 舒適的閱讀體驗

**4. 尊重與同理心**
- 非性別刻板的設計
- 避免粉紅少女風
- 專業而溫暖的語調

---

## 🎭 品牌定位

### 靈感來源

**Clue（極簡主義 + 科學感）**
- 扁平、理性的設計語言
- 中性色彩
- Icon 驅動的UI

**Flo（個人化 + 數據視覺化）**
- 清晰的層級結構
- 美麗的圖表
- Dashboard 設計

**Apple Health（專業健康應用）**
- 可信賴的視覺語言
- 清晰的數據呈現
- 無障礙支援

### Tide 的獨特性

✨ **情侶導向** - 雙視角、關懷導向的設計
🌊 **自然隱喻** - 潮汐、波浪、月相的視覺元素
🎯 **極簡高效** - 3 秒記錄、一目了然的資訊

---

## 🎨 色彩系統

### 階段色彩（Phase Colors）

每個週期階段都有專屬的柔和色調，避免使用高飽和度：

#### 🌊 Menstrual Phase（月經期）
```
Primary:   #E89E8F  // 柔和珊瑚紅
Light:     #F5D4CD  // 淺珊瑚
Lighter:   #FBF0ED  // 極淺背景
Text:      #8B4A3C  // 深紅棕
```
**情緒**: 溫暖、安撫、支持

#### 🌱 Follicular Phase（濾泡期）
```
Primary:   #E8B88F  // 柔和金色
Light:     #F5E4CD  // 淺金
Lighter:   #FBF7ED  // 極淺背景
Text:      #8B6A3C  // 深金棕
```
**情緒**: 活力、新生、成長

#### ✨ Ovulatory Phase（排卵期）
```
Primary:   #A8D5BA  // 柔和綠色
Light:     #D8F0E1  // 淺綠
Lighter:   #F0FAF4  // 極淺背景
Text:      #4A7C59  // 深綠
```
**情緒**: 生命力、巔峰、自信

#### 🌾 Luteal Early Phase（黃體前期）
```
Primary:   #8FC4E8  // 柔和天藍
Light:     #CDE4F5  // 淺藍
Lighter:   #EDF7FB  // 極淺背景
Text:      #3C6A8B  // 深藍
```
**情緒**: 平穩、專注、生產力

#### 🌙 Luteal Late Phase（黃體後期）
```
Primary:   #C5A8D5  // 柔和紫色
Light:     #E6D8F0  // 淺紫
Lighter:   #F5F0FA  // 極淺背景
Text:      #6A4A7C  // 深紫
```
**情緒**: 敏感、內省、休養

### 中性色階（Neutral Colors）

```
50:  #FAFAFA  // 極淺灰
100: #F5F5F5  // 很淺灰
200: #E5E5E5  // 淺灰
300: #D4D4D4  // 中淺灰
400: #A3A3A3  // 中灰
500: #737373  // 灰
600: #525252  // 深灰
700: #404040  // 很深灰
800: #262626  // 極深灰
900: #171717  // 接近黑
```

### 語意色彩（Semantic Colors）

```
Success:  #22C55E  // 綠色
Warning:  #F59E0B  // 橙色
Error:    #EF4444  // 紅色
Info:     #3B82F6  // 藍色
```

### 情緒色彩（Mood Colors）

```
Happy:     #F9D71C  // 明亮黃
Calm:      #A8D5BA  // 平靜綠
Energetic: #FF9F40  // 活力橙
Anxious:   #8FC4E8  // 焦慮藍
Sad:       #6B8CAE  // 憂傷藍灰
Irritable: #E89E8F  // 易怒珊瑚紅
Tired:     #C5A8D5  // 疲倦紫
```

---

## ✏️ 字體系統

### 字體家族

**Primary**: System（iOS San Francisco）
- 優秀的可讀性
- iOS 原生外觀
- 自動支援 Dynamic Type

### 字體尺寸階層

```
xs:   12px  // Caption, Tags
sm:   14px  // Body 2, Secondary text
base: 16px  // Body 1, Main text
lg:   18px  // Subtitle
xl:   20px  // Heading 4
2xl:  24px  // Heading 3
3xl:  30px  // Heading 2
4xl:  36px  // Heading 1
5xl:  48px  // Display
```

### 預定義樣式

**Headlines**
```typescript
h1: { size: 36, weight: 700, lineHeight: 1.2 }
h2: { size: 30, weight: 700, lineHeight: 1.2 }
h3: { size: 24, weight: 600, lineHeight: 1.3 }
h4: { size: 20, weight: 600, lineHeight: 1.4 }
```

**Body**
```typescript
subtitle1: { size: 18, weight: 500, lineHeight: 1.5 }
subtitle2: { size: 16, weight: 500, lineHeight: 1.5 }
body1:     { size: 16, weight: 400, lineHeight: 1.5 }
body2:     { size: 14, weight: 400, lineHeight: 1.5 }
caption:   { size: 12, weight: 400, lineHeight: 1.5 }
```

**Special**
```typescript
button:   { size: 16, weight: 600, letterSpacing: 0.5 }
overline: { size: 12, weight: 600, letterSpacing: 1, uppercase }
```

---

## 📏 間距系統

### 8pt Grid

所有間距必須是 4 的倍數：

```
xs:  4px   // 0.5 單位
sm:  8px   // 1 單位（基礎）
md:  16px  // 2 單位
lg:  24px  // 3 單位
xl:  32px  // 4 單位
2xl: 40px  // 5 單位
3xl: 48px  // 6 單位
4xl: 64px  // 8 單位
5xl: 80px  // 10 單位
```

### 使用指南

**元素間距**: `sm` (8px)
**區塊間距**: `md` (16px)
**章節間距**: `lg` (24px)
**畫面邊距**: `md` (16px)
**卡片內邊距**: `md` (16px)

---

## 🔘 圓角系統

```
none: 0px
sm:   4px   // Chips, Tags
md:   8px   // Inputs, Small cards
lg:   12px  // Cards, Buttons
xl:   16px  // Large cards
2xl:  20px  // Bottom sheets
3xl:  24px  // Modals
full: 9999px // Pills, Icon buttons
```

---

## 💫 陰影系統

### iOS 風格陰影

```typescript
sm: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
}

md: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
}

lg: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
}

xl: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
}
```

### 使用指南

**Cards**: `md` shadow
**Floating buttons**: `lg` shadow
**Modals/Sheets**: `xl` shadow
**Elevated elements**: `sm` shadow

---

## 🎬 動畫系統

### 時長（Duration）

```
fast:   150ms  // Micro-interactions
normal: 250ms  // Standard transitions
slow:   350ms  // Complex animations
```

### 緩動函數（Easing）

```
ease-in:     Cubic Bezier(0.42, 0, 1, 1)
ease-out:    Cubic Bezier(0, 0, 0.58, 1)
ease-in-out: Cubic Bezier(0.42, 0, 0.58, 1)
spring:      Use withSpring() from Reanimated
```

### 動畫類型

**進入動畫**
- `FadeIn`: 淡入
- `FadeInDown`: 從上淡入
- `FadeInUp`: 從下淡入
- `SlideInRight`: 從右滑入

**互動動畫**
- 按鈕按壓: `scale(0.95)`
- Chip 選擇: 顏色漸變 + scale
- 底部抽屜: 滑動 + 透明度

**頁面轉場**
- 標準: Slide from right
- Modal: Fade + Scale from center

---

## 🎯 組件規範

### Button

**變體**:
- `primary`: 主要操作（階段色彩背景 + 白色文字）
- `secondary`: 次要操作（灰色背景）
- `outline`: 邊框按鈕（透明背景 + 色彩邊框）
- `ghost`: 幽靈按鈕（透明背景）

**尺寸**:
- `sm`: 36px height
- `md`: 48px height
- `lg`: 56px height

**狀態**:
- Normal
- Pressed (scale 0.97)
- Disabled (opacity 0.5)
- Loading (Spinner)

### Card

**變體**:
- Default: 白色背景 + md shadow
- Accent: 左側強調色邊框
- Flat: 無陰影

**內邊距**: `md` (16px)
**圓角**: `lg` (12px)

### Input

**變體**:
- `filled`: 填充背景（預設）
- `outline`: 邊框樣式
- `default`: 底線樣式

**狀態**:
- Normal
- Focused (階段色彩邊框)
- Error (錯誤紅色)
- Disabled

### Chip

**功能**: 可選擇的標籤
**動畫**: 顏色漸變 + 輕微縮放
**狀態**: Normal / Selected

---

## 📱 Layout 規範

### 畫面結構

```
SafeAreaView
  ScrollView
    paddingHorizontal: 16px
    paddingVertical: 8px

    Section 1 (marginBottom: 24px)
    Section 2 (marginBottom: 24px)
    Section 3 (marginBottom: 24px)

    BottomSpacer: 48px
```

### 常見模式

**列表項目**:
```
ListItem
  height: auto (min 56px)
  paddingVertical: 12px
  paddingHorizontal: 16px
  marginBottom: 8px
```

**卡片網格**:
```
2 columns
gap: 12px
```

**表單**:
```
Label (marginBottom: 4px)
Input (marginBottom: 16px)
Hint/Error (marginTop: 4px)
```

---

## ♿️ 無障礙（Accessibility）

### 對比度

所有文字必須符合 WCAG AA 標準：
- 大文字（18px+）: 3:1
- 小文字: 4.5:1

### VoiceOver

所有互動元素必須有：
- `accessibilityLabel`
- `accessibilityHint`
- `accessibilityRole`

### Dynamic Type

支援 iOS 動態字體縮放（最小 x0.8, 最大 x1.3）

---

## 📐 圖標系統

### 尺寸

```
sm: 16px
md: 24px
lg: 32px
xl: 48px
```

### 風格

**Primary**: Emoji（v1）
- 簡單直覺
- 跨平台一致
- 無需設計

**Future**: SF Symbols 或自定義
- 更專業
- 品牌一致性

---

## 🌈 Dark Mode（未來）

### 策略

v1 專注 Light Mode，v2 考慮 Dark Mode

### 色彩調整原則

- 反轉明暗
- 降低對比度
- 調整飽和度
- 保持品牌色彩

---

## 📝 文案風格指南

### 語調

**溫暖而專業**
- 使用 "you" 而非 "users"
- 簡潔直接
- 避免術語
- 正面鼓勵

### 範例

✅ **好的**:
- "How are you feeling today?"
- "Your period may start in 3 days"
- "Take it easy today"

❌ **避免**:
- "Input your symptoms"
- "Menstruation commencing"
- "Warning: PMS detected"

### Partner 文案

**關懷導向**:
- "She may need extra support today"
- "Consider preparing something warm"
- "This is a sensitive time"

**避免**:
- "She's hormonal"
- "Watch out"
- Any controlling language

---

## 🎨 設計資源

### Figma

（未來）完整的設計系統 Figma 文件

### 參考

- Apple Human Interface Guidelines
- Material Design 3
- Flo / Clue / Eve 設計分析

---

**版本**: 1.0
**最後更新**: 2025-01-15
**維護者**: Tide Design Team

# Tide 開發指南

## 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn
- Xcode 14+ (用於 iOS 開發)
- iOS Simulator 或實體 iPhone

### 安裝步驟

```bash
# 1. 複製專案
git clone <repository-url>
cd Tide-understand-her-cycle-together

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm start

# 4. 在 iOS 模擬器運行
npm run ios
```

## 開發工作流

### 1. 創建新功能

```bash
# 1. 創建功能分支
git checkout -b feature/your-feature-name

# 2. 開發功能
# - 在適當的資料夾中添加文件
# - 遵循現有的檔案結構和命名規範

# 3. 測試功能
npm run type-check  # TypeScript 類型檢查
npm run lint        # ESLint 檢查

# 4. 提交更改
git add .
git commit -m "feat: add your feature description"

# 5. 推送並創建 PR
git push origin feature/your-feature-name
```

### 2. 常見開發任務

#### 添加新的畫面

```typescript
// 1. 在 app/ 下創建新文件
// 例如：app/(her)/new-screen.tsx

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function NewScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <View>
        <Text>New Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// 2. 如果需要在 Tab 導航中顯示，在 _layout.tsx 中添加
<Tabs.Screen
  name="new-screen"
  options={{
    title: 'New Screen',
    // tabBarIcon: ...
  }}
/>
```

#### 添加新的組件

```typescript
// 1. 在 src/components/ 創建組件文件
// 例如：src/components/CustomInput.tsx

import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '@theme';

interface CustomInputProps extends TextInputProps {
  // 添加自定義 props
}

export function CustomInput({ ...props }: CustomInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={theme.colors.text.tertiary}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: theme.constants.inputHeight,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background.tertiary,
    ...theme.typography.styles.body1,
  },
});

// 2. 在 src/components/index.ts 中導出
export { CustomInput } from './CustomInput';
```

#### 添加新的 Store

```typescript
// 1. 在 src/stores/ 創建 store 文件
// 例如：src/stores/settingsStore.ts

import { create } from 'zustand';

interface SettingsState {
  // 狀態
  theme: 'light' | 'dark';
  language: 'en' | 'zh-TW';

  // 動作
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'zh-TW') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'light',
  language: 'en',

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));

// 2. 在 src/stores/index.ts 中導出
export { useSettingsStore } from './settingsStore';
```

#### 添加新的工具函數

```typescript
// 1. 在 src/utils/ 創建工具文件
// 例如：src/utils/validators.ts

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPairingCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}

// 2. 在 src/utils/index.ts 中導出
export * from './validators';
```

## 代碼風格指南

### TypeScript 規範

```typescript
// ✅ 好的做法
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null {
  // ...
}

// ❌ 避免
function getUser(id: any): any {
  // ...
}
```

### 組件規範

```typescript
// ✅ 好的做法：明確的 props 類型
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, onPress, disabled = false }: ButtonProps) {
  // ...
}

// ❌ 避免：未定義類型的 props
export function Button(props) {
  // ...
}
```

### 樣式規範

```typescript
// ✅ 好的做法：使用 theme tokens
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.radius.lg,
  },
});

// ❌ 避免：硬編碼數值
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F1ED',
    borderRadius: 12,
  },
});
```

### 狀態管理規範

```typescript
// ✅ 好的做法：使用 selectors
const user = useUserStore((state) => state.user);
const isHer = useUserStore(selectIsHer);

// ✅ 好的做法：在組件外定義 selectors
export const selectIsHer = (state: UserState) =>
  state.user?.role === UserRole.HER;

// ❌ 避免：在組件內計算派生狀態
const isHer = useUserStore((state) => state.user?.role === UserRole.HER);
```

## 調試技巧

### React Native Debugger

```bash
# 在 iOS 模擬器中
# Cmd + D 打開開發者菜單
# 選擇 "Debug"
```

### 日誌輸出

```typescript
// 使用有意義的日誌標籤
console.log('[CycleCalculation]', 'Predicting next period:', prediction);

// 開發環境專用日誌
if (__DEV__) {
  console.log('Development info:', data);
}
```

### TypeScript 類型檢查

```bash
# 運行類型檢查（不會編譯）
npm run type-check

# 監聽模式
npm run type-check -- --watch
```

## 常見問題

### Q: Expo Router 找不到路由

**A**: 確保：
1. 文件在 `app/` 目錄下
2. 文件名不包含特殊字符
3. 重啟開發伺服器

### Q: TypeScript 找不到模組

**A**: 檢查：
1. `tsconfig.json` 中的 paths 配置
2. `babel.config.js` 中的 alias 配置
3. 重啟 TypeScript 伺服器（VSCode: Cmd+Shift+P → "Restart TS Server"）

### Q: 樣式沒有生效

**A**: 確認：
1. 使用 `StyleSheet.create`
2. style prop 正確傳遞
3. 沒有被其他樣式覆蓋
4. 重新加載應用

### Q: Store 狀態不更新

**A**: 檢查：
1. 是否正確調用 set 函數
2. 是否正確訂閱 store
3. React 組件是否重新渲染

## 性能優化檢查清單

- [ ] 大型列表使用 `FlatList` 而非 `ScrollView`
- [ ] 使用 `React.memo` 包裝純展示組件
- [ ] 使用 Zustand selectors 避免不必要的重渲染
- [ ] 圖片使用適當的尺寸和格式
- [ ] 避免在 render 中創建新的對象/函數
- [ ] 使用 `useCallback` 和 `useMemo` 優化重複計算

## 提交規範

遵循 Conventional Commits：

```bash
# 功能
git commit -m "feat: add caring card component"

# 修復
git commit -m "fix: correct cycle prediction calculation"

# 文檔
git commit -m "docs: update README with setup instructions"

# 樣式
git commit -m "style: format code with prettier"

# 重構
git commit -m "refactor: simplify phase calculation logic"

# 測試
git commit -m "test: add tests for pairing service"

# 雜項
git commit -m "chore: update dependencies"
```

## 發布流程（未來）

```bash
# 1. 更新版本號
npm version patch  # 或 minor / major

# 2. 創建發布標籤
git tag -a v1.0.0 -m "Release v1.0.0"

# 3. 推送標籤
git push origin v1.0.0

# 4. 構建 iOS 應用
eas build --platform ios

# 5. 提交到 App Store
eas submit --platform ios
```

## 資源連結

- [React Native 文檔](https://reactnative.dev/)
- [Expo 文檔](https://docs.expo.dev/)
- [Expo Router 文檔](https://docs.expo.dev/router/introduction/)
- [Zustand 文檔](https://docs.pmnd.rs/zustand/)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)

---

**保持代碼整潔，保持架構清晰，保持同理心。** 🌊

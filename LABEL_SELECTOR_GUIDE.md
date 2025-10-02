# Label Selector Component

## 概述

`LabelSelector` 是一個功能豐富的下拉式標籤選擇器元件，提供了類似 GitHub Issue 標籤選擇的使用體驗。

## 特性

- ✅ 下拉選單顯示已選擇的標籤數量
- ✅ 搜尋功能（預留介面）
- ✅ 顯示已選擇的標籤列表
- ✅ 可移除已選擇的標籤
- ✅ 「Clear」按鈕快速清空所有選擇
- ✅ 建立新標籤功能
- ✅ 14 種預設顏色選擇器
- ✅ 自訂顏色輸入
- ✅ 管理標籤按鈕（事件處理）
- ✅ 所有互動元素都包含 `data-activity` 屬性，方便自動化測試

## 檔案位置

```
src/components/ui/LabelSelector.vue
src/pages/LabelSelectorDemo.vue (示範頁面)
```

## 使用方法

### 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import LabelSelector from '@/components/ui/LabelSelector.vue'

interface Label {
  id: string
  name: string
  color: string
}

const selectedLabels = ref<Label[]>([])

function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  const label: Label = {
    id: Date.now().toString(),
    ...newLabel,
  }

  // 處理新標籤的邏輯
  console.log('New label created:', label)
}

function handleManageLabels() {
  // 導航到管理頁面或打開管理對話框
  console.log('Manage labels')
}
</script>

<template>
  <LabelSelector
    v-model="selectedLabels"
    @create="handleCreateLabel"
    @manage="handleManageLabels"
  />
</template>
```

### Props

| 屬性名 | 類型 | 必填 | 預設值 | 說明 |
|--------|------|------|--------|------|
| `modelValue` | `Label[]` | 否 | `[]` | 已選擇的標籤列表（使用 `v-model` 綁定） |
| `availableLabels` | `Label[]` | 否 | `[]` | 可選擇的標籤列表（目前未使用，預留給搜尋功能） |

### Events

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `Label[]` | 當選擇的標籤變更時觸發 |
| `create` | `Omit<Label, 'id'>` | 當使用者建立新標籤時觸發，傳遞標籤名稱和顏色 |
| `manage` | - | 當使用者點擊「Manage Labels」按鈕時觸發 |

### Label 介面

```typescript
interface Label {
  id: string      // 唯一識別碼
  name: string    // 標籤名稱
  color: string   // 標籤顏色（Hex 格式，例如 #ff0000）
}
```

## UI 流程

### 主視圖（標籤選擇）

1. **觸發按鈕**: 顯示已選擇的標籤數量
   - 無選擇時：「Select Labels」
   - 有選擇時：「{第一個標籤名稱} +{其他數量} More」

2. **搜尋框**: 可輸入關鍵字搜尋標籤（功能預留）

3. **已選擇標籤區域**:
   - 顯示「Selected」標題
   - 顯示所有已選擇的標籤
   - 每個標籤都有顏色指示器和名稱
   - 右側有 X 按鈕可移除
   - 右上角有「Clear」按鈕清空全部

4. **操作按鈕**:
   - 「Create Label」: 切換到建立標籤視圖
   - 「Manage Labels」: 觸發 `@manage` 事件

### 建立標籤視圖

1. **標籤名稱輸入框**: 輸入新標籤的名稱

2. **顏色選擇器**: 
   - 14 個預設顏色方格可點選
   - 選中的顏色會有藍色邊框高亮

3. **自訂顏色輸入**:
   - 左側顏色預覽方塊（可點擊，預留給顏色選擇器）
   - 右側文字輸入框可直接輸入 Hex 顏色代碼

4. **操作按鈕**:
   - 「Cancel」: 取消建立，返回主視圖
   - 「Create」: 建立標籤並觸發 `@create` 事件（需要輸入名稱才能啟用）

## 預設顏色

元件提供 14 種預設顏色：

```typescript
'#e91e63', // Pink
'#f44336', // Red
'#c2185b', // Deep Pink
'#ff7043', // Deep Orange
'#ff9800', // Orange
'#ffeb3b', // Yellow
'#009688', // Teal
'#a5d6a7', // Light Green
'#64b5f6', // Light Blue
'#f5f5f5', // White/Light Gray
'#9c27b0', // Purple
'#673ab7', // Deep Purple
'#455a64', // Blue Gray
'#9e9e9e', // Gray
```

## 自動化測試屬性

所有互動元素都包含 `data-activity` 屬性：

- `label-selector-trigger`: 觸發下拉選單的按鈕
- `label-search-input`: 搜尋輸入框
- `label-clear-all`: 清空所有選擇的按鈕
- `selected-label-item`: 已選擇的標籤項目
- `deselect-label`: 移除標籤的按鈕
- `create-label-button`: 建立標籤按鈕
- `manage-label-button`: 管理標籤按鈕
- `new-label-name-input`: 新標籤名稱輸入框
- `color-option`: 顏色選項方格
- `custom-color-preview`: 自訂顏色預覽
- `custom-color-input`: 自訂顏色輸入框
- `cancel-create-label`: 取消建立按鈕
- `confirm-create-label`: 確認建立按鈕

## 樣式特性

- 使用 Vuetify 元件系統
- 遵循 Material Design 設計規範
- 支援深色/淺色主題
- 響應式設計
- 流暢的過渡動畫
- 自訂捲軸樣式

## 注意事項

1. **搜尋功能**: 目前搜尋輸入框已就位，但搜尋邏輯尚未實作。可在需要時輕鬆添加。

2. **標籤管理**: `@manage` 事件讓你可以自由決定如何處理標籤管理（例如：導航到管理頁面、打開對話框等）。

3. **顏色選擇器**: 目前自訂顏色預覽方塊可點擊，但尚未整合完整的顏色選擇器。`showColorPicker` 狀態已預留給未來整合使用。

4. **ID 生成**: 在建立新標籤時，`id` 需要由父元件生成。建議使用時間戳或 UUID。

## 示範頁面

訪問 `/label-selector-demo` 可查看完整的使用示範，包含：

- 基本使用方式
- 事件處理
- 資料綁定展示
- 已選擇標籤的視覺化呈現

## 相關元件

- `TagSelector.vue`: 另一個標籤選擇器元件（不同的設計風格）
- 位置: `src/components/ui/TagSelector.vue`

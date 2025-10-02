# Advanced Label Selector Component Guide

## 概述

`AdvancedLabelSelector` 是一個進階的標籤選擇器元件，提供搜尋、選擇、新增標籤等完整功能。

## 功能特性

### 主要功能

1. **即時搜尋過濾**
   - 可以即時篩選現有的 Label
   - 支援模糊搜尋（不分大小寫）

2. **多選標籤**
   - 支援選擇多個標籤
   - 顯示已選和未選標籤列表
   - 可快速清除所有已選標籤

3. **新增標籤**
   - 輸入標籤名稱
   - 選擇預設顏色（12 個固定色塊）
   - 使用調色盤自訂顏色
   - 手動輸入 hex 色碼

4. **標籤管理**
   - 透過 `go-manage` 事件跳轉到管理頁面

## 使用方式

### 基本用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import AdvancedLabelSelector from '@/components/ui/AdvancedLabelSelector.vue'

interface Label {
  id: string
  name: string
  color: string
}

const selectedLabels = ref<Label[]>([])

const availableLabels = ref<Label[]>([
  { id: '1', name: 'Bug', color: '#E91E63' },
  { id: '2', name: 'Feature', color: '#4CAF50' },
])

function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  const label: Label = {
    id: Date.now().toString(),
    ...newLabel,
  }

  availableLabels.value.push(label)
}

function handleGoManage() {
  // 導航到標籤管理頁面
  router.push('/label-management')
}
</script>

<template>
  <AdvancedLabelSelector
    v-model="selectedLabels"
    :available-labels="availableLabels"
    @create-label="handleCreateLabel"
    @go-manage="handleGoManage"
  />
</template>
```

## Props

| 名稱 | 類型 | 必填 | 預設值 | 說明 |
|------|------|------|--------|------|
| `modelValue` | `Label[]` | 否 | `[]` | 當前選擇的標籤（v-model） |
| `availableLabels` | `Label[]` | 否 | `[]` | 所有可用的標籤列表 |

### Label 介面

```typescript
interface Label {
  id: string      // 唯一識別碼
  name: string    // 標籤名稱
  color: string   // Hex 色碼（例如：#E91E63）
}
```

## Events

| 事件名稱 | 參數 | 說明 |
|---------|------|------|
| `update:modelValue` | `(value: Label[]) => void` | 當選擇的標籤改變時觸發 |
| `create-label` | `(label: Omit<Label, 'id'>) => void` | 當新增標籤時觸發 |
| `go-manage` | `() => void` | 當點擊「Label Management」按鈕時觸發 |

## UI 畫面說明

### 主要畫面

1. **標題列**
   - 左側：「Labels」標題
   - 右側：「Apply Labels」提示

2. **搜尋框**
   - 即時過濾標籤
   - 支援清除按鈕

3. **已選擇標籤區域**
   - 顯示所有已選標籤
   - 每個標籤右側有移除按鈕
   - 右上角有「Clear All」按鈕

4. **可選擇標籤區域**
   - 顯示未選擇的標籤
   - 點擊即可選擇

5. **底部按鈕**
   - **Add Label**：切換到新增標籤畫面
   - **Label Management**：觸發 `go-manage` 事件

### 新增標籤畫面

1. **標題列**
   - 左側：返回按鈕
   - 「Create New Label」標題

2. **標籤名稱輸入**
   - 自動 focus
   - 必填欄位

3. **顏色選擇區**
   - **預設顏色**：12 個固定色塊（Grid 佈局，6 欄）
   - **自訂顏色**：
     - 顏色預覽框（點擊開啟調色盤）
     - Hex 色碼輸入框
     - 自動驗證並格式化輸入

4. **底部操作按鈕**
   - **Cancel**：取消並返回主畫面
   - **Confirm**：確認新增（名稱為空時禁用）

## 預設顏色清單

元件提供 12 個預設顏色：

```typescript
const predefinedColors = [
  '#e91e63', // Pink
  '#f44336', // Red
  '#ff5722', // Deep Orange
  '#ff9800', // Orange
  '#ffc107', // Amber
  '#ffeb3b', // Yellow
  '#4caf50', // Green
  '#009688', // Teal
  '#03a9f4', // Light Blue
  '#2196f3', // Blue
  '#3f51b5', // Indigo
  '#9c27b0', // Purple
]
```

## 樣式特性

- 使用 Vuetify 的 Material Design 主題
- 支援淺色/深色模式切換
- 響應式設計
- 流暢的過場動效
- 自訂滾動條樣式

## 測試屬性 (data-activity)

元件已加入完整的 `data-activity` 屬性，方便自動化測試：

- `advanced-label-selector-trigger`：觸發按鈕
- `advanced-label-search-input`：搜尋輸入框
- `advanced-label-clear-all`：清除全部按鈕
- `advanced-selected-label-item`：已選標籤項目
- `advanced-available-label-item`：可選標籤項目
- `advanced-create-label-button`：新增標籤按鈕
- `advanced-manage-label-button`：管理標籤按鈕
- `advanced-new-label-name-input`：標籤名稱輸入框
- `advanced-color-option`：顏色選項
- `advanced-custom-color-preview`：自訂顏色預覽框
- `advanced-custom-color-input`：Hex 色碼輸入框
- `advanced-confirm-create-label`：確認新增按鈕
- `advanced-cancel-create-label`：取消按鈕

## 進階用法

### 與 API 整合

```typescript
import { useFetch } from '@/composables/useFetch'

// 取得標籤列表
async function fetchLabels() {
  const { data, execute } = useFetch<Label[]>(
    '/api/labels',
    { method: 'GET' }
  )
  await execute()
  if (data.value) {
    availableLabels.value = data.value
  }
}

// 新增標籤
async function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  const { data, execute } = useFetch<Label>(
    '/api/labels',
    {
      method: 'POST',
      body: JSON.stringify(newLabel),
    }
  )
  
  await execute()
  
  if (data.value) {
    availableLabels.value.push(data.value)
  }
}
```

### 自訂樣式

```vue
<AdvancedLabelSelector
  v-model="selectedLabels"
  :available-labels="availableLabels"
  class="my-custom-selector"
/>

<style>
.my-custom-selector {
  /* 自訂樣式 */
}
</style>
```

## 注意事項

1. **唯一 ID**：確保每個標籤的 `id` 是唯一的
2. **色碼格式**：顏色必須是有效的 hex 色碼格式（#RGB 或 #RRGGBB）
3. **事件處理**：記得處理 `create-label` 和 `go-manage` 事件
4. **響應式**：`availableLabels` 更新時，元件會自動重新渲染

## Demo 頁面

訪問 `/advanced-label-selector-demo` 查看完整的示範和範例程式碼。

## 相關檔案

- 元件：`src/components/ui/AdvancedLabelSelector.vue`
- Demo 頁面：`src/pages/AdvancedLabelSelectorDemo.vue`
- 路由設定：`src/plugins/router/routes.ts`
- 導航項目：`src/layouts/components/NavItems.vue`

## 版本歷史

- **v1.0.0** (2025-10-02)
  - 初始版本
  - 支援搜尋、多選、新增標籤功能
  - 提供 12 個預設顏色和自訂顏色功能
  - 完整的自動化測試屬性

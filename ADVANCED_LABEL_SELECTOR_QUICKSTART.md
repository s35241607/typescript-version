# Quick Start - Advanced Label Selector

## 快速開始

### 1. 查看 Demo

啟動專案後，訪問以下路徑查看元件示範：

```
http://localhost:3000/advanced-label-selector-demo
```

或從側邊欄導航選擇 **「Advanced Label Selector」**

---

## 2. 基本使用範例

### 最簡單的使用方式

```vue
<script setup lang="ts">
import { ref } from 'vue'
import AdvancedLabelSelector from '@/components/ui/AdvancedLabelSelector.vue'

// 定義標籤類型
interface Label {
  id: string
  name: string
  color: string
}

// 已選擇的標籤
const selectedLabels = ref<Label[]>([])

// 所有可用標籤
const availableLabels = ref<Label[]>([
  { id: '1', name: 'Bug', color: '#E91E63' },
  { id: '2', name: 'Feature', color: '#4CAF50' },
  { id: '3', name: 'Documentation', color: '#2196F3' },
])

// 新增標籤處理
function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  const label: Label = {
    id: Date.now().toString(),
    ...newLabel,
  }

  availableLabels.value.push(label)
  console.log('新增標籤:', label)
}

// 管理標籤處理
function handleGoManage() {
  console.log('前往管理頁面')

  // router.push('/label-management')
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

---

## 3. 主要功能說明

### 功能一：搜尋與選擇標籤
1. 點擊「Select Labels」按鈕開啟選單
2. 在搜尋框輸入關鍵字即時篩選
3. 點擊標籤進行選擇
4. 點擊已選標籤右側的 ✕ 移除
5. 點擊「Clear All」清除所有選擇

### 功能二：新增標籤
1. 點擊「Add Label」按鈕
2. 輸入標籤名稱
3. 選擇顏色：
   - **方式 A**：點擊預設的 12 個顏色之一
   - **方式 B**：點擊顏色預覽框開啟調色盤
   - **方式 C**：直接輸入 Hex 色碼（例如：#FF5722）
4. 點擊「Confirm」確認新增

### 功能三：標籤管理
- 點擊「Label Management」按鈕
- 觸發 `go-manage` 事件
- 可在事件處理中導航到管理頁面

---

## 4. Props 和 Events

### Props

| 名稱 | 類型 | 說明 |
|------|------|------|
| `v-model` | `Label[]` | 當前選擇的標籤（雙向綁定） |
| `available-labels` | `Label[]` | 所有可用的標籤列表 |

### Events

| 事件名稱 | 參數 | 說明 |
|---------|------|------|
| `@create-label` | `(label: Omit<Label, 'id'>) => void` | 當使用者新增標籤時觸發 |
| `@go-manage` | `() => void` | 當使用者點擊管理按鈕時觸發 |

---

## 5. 預設顏色清單

元件提供 12 個預設顏色（Material Design 色系）：

- 🔴 Pink (#e91e63)
- 🔴 Red (#f44336)
- 🟠 Deep Orange (#ff5722)
- 🟠 Orange (#ff9800)
- 🟡 Amber (#ffc107)
- 🟡 Yellow (#ffeb3b)
- 🟢 Green (#4caf50)
- 🟢 Teal (#009688)
- 🔵 Light Blue (#03a9f4)
- 🔵 Blue (#2196f3)
- 🟣 Indigo (#3f51b5)
- 🟣 Purple (#9c27b0)

---

## 6. 常見使用場景

### 場景 1：Ticket 系統
```vue
<AdvancedLabelSelector
  v-model="ticket.labels"
  :available-labels="systemLabels"
  @create-label="createLabelAPI"
  @go-manage="router.push('/admin/labels')"
/>
```

### 場景 2：文章分類
```vue
<AdvancedLabelSelector
  v-model="article.tags"
  :available-labels="availableTags"
  @create-label="addNewTag"
  @go-manage="openTagManager"
/>
```

### 場景 3：用戶權限標籤
```vue
<AdvancedLabelSelector
  v-model="user.permissions"
  :available-labels="allPermissions"
  @create-label="defineNewPermission"
  @go-manage="goToPermissionSettings"
/>
```

---

## 7. 與後端 API 整合

### 使用 useFetch 組合式函數

```typescript
import { useFetch } from '@/composables/useFetch'

// 取得所有標籤
async function fetchLabels() {
  const { data, execute } = useFetch<Label[]>('/api/labels', {
    method: 'GET',
  })
  
  await execute()
  
  if (data.value)
    availableLabels.value = data.value
}

// 新增標籤
async function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  const { data, execute } = useFetch<Label>('/api/labels', {
    method: 'POST',
    body: JSON.stringify(newLabel),
  })
  
  await execute()
  
  if (data.value) {
    availableLabels.value.push(data.value)
    selectedLabels.value.push(data.value) // 自動選擇新建的標籤
  }
}

// 初始化時載入
onMounted(() => {
  fetchLabels()
})
```

---

## 8. 測試屬性 (data-activity)

所有互動元素都加入了 `data-activity` 屬性，方便進行自動化測試：

```javascript
// E2E 測試範例 (Playwright)
await page.click('[data-activity="advanced-label-selector-trigger"]')
await page.fill('[data-activity="advanced-label-search-input"]', 'bug')
await page.click('[data-activity="advanced-create-label-button"]')
await page.fill('[data-activity="advanced-new-label-name-input"]', 'New Label')
await page.click('[data-activity="advanced-color-option"]:first-child')
await page.click('[data-activity="advanced-confirm-create-label"]')
```

---

## 9. 疑難排解

### Q: 標籤選擇後沒有反應？
**A**: 確保正確使用 `v-model` 綁定，並且 `selectedLabels` 是響應式資料。

### Q: 顏色預覽不正確？
**A**: 確保顏色格式為有效的 Hex 色碼（#RRGGBB 或 #RGB）。

### Q: 新增標籤後沒有顯示？
**A**: 檢查 `@create-label` 事件處理函數是否正確將新標籤加入 `availableLabels`。

### Q: 如何禁用某些標籤？
**A**: 目前版本不支援禁用功能，可以透過過濾 `availableLabels` 來移除不可選的標籤。

---

## 10. 更多資訊

- 📖 **完整文件**: `ADVANCED_LABEL_SELECTOR_GUIDE.md`
- 📊 **實作總結**: `ADVANCED_LABEL_SELECTOR_SUMMARY.md`
- 💻 **原始碼**: `src/components/ui/AdvancedLabelSelector.vue`
- 🎯 **Demo 頁面**: `src/pages/AdvancedLabelSelectorDemo.vue`

---

**需要協助？** 查看 Demo 頁面的完整範例和 API 說明！

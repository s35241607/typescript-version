# Label Selector 更新日誌

## 2025年10月2日 - 功能優化

### ✨ 新增功能

#### 1. 可選擇的標籤列表
- **問題**: 原本下拉選單中只顯示已選擇的標籤，沒有顯示可以選擇的標籤
- **解決方案**: 
  - 新增 `availableLabels` 計算屬性來獲取所有可用標籤
  - 新增 `filteredAvailableLabels` 來支援搜尋過濾功能
  - 新增 `unselectedLabels` 計算屬性來顯示未選擇的標籤
  - 在下拉選單中添加「Available」區域，顯示所有可選擇的標籤
  - 點擊未選擇的標籤即可將其加入選擇列表

#### 2. 顏色選擇器（Color Picker）
- **問題**: 點擊顏色預覽框時沒有調色盤功能
- **解決方案**:
  - 整合 Vuetify 的 `VColorPicker` 元件
  - 使用 `VMenu` 包裹顏色選擇器，實現下拉式調色盤
  - 支援 HEXA 色彩模式
  - 顯示預設的 14 種顏色作為色票（swatches）
  - 隱藏畫布和輸入框，保持介面簡潔
  - 調色盤位置設定為 `bottom start`，避免遮擋其他元素

### 🎨 UI/UX 改進

#### 搜尋功能
- 搜尋框現在可以實際過濾標籤列表
- 支援即時搜尋，輸入時自動更新列表
- 不區分大小寫的搜尋匹配

#### 互動體驗
- 未選擇的標籤項目現在可點擊
- 添加 hover 效果，滑鼠移過時顯示淺色背景
- 流暢的過渡動畫（0.2s ease）
- 添加 `data-activity="available-label-item"` 屬性方便自動化測試

### 📋 新增的計算屬性

```typescript
// 所有可用標籤
const availableLabels = computed(() => props.availableLabels || [])

// 根據搜尋過濾的標籤
const filteredAvailableLabels = computed(() => {
  if (!searchQuery.value.trim())
    return availableLabels.value

  const query = searchQuery.value.toLowerCase()
  return availableLabels.value.filter(label =>
    label.name.toLowerCase().includes(query),
  )
})

// 未選擇的標籤
const unselectedLabels = computed(() => {
  const selectedIds = new Set(selectedLabels.value.map(l => l.id))
  return filteredAvailableLabels.value.filter(label => !selectedIds.has(label.id))
})
```

### 🔧 技術細節

#### VColorPicker 配置
```vue
<VColorPicker
  v-model="newLabelColor"
  mode="hexa"
  :modes="['hexa']"
  hide-canvas
  hide-inputs
  :swatches="[predefinedColors]"
  show-swatches
/>
```

- **mode**: 設定為 `hexa`（包含透明度的十六進制）
- **modes**: 限制只能使用 hexa 模式
- **hide-canvas**: 隱藏漸變選擇畫布，保持介面簡潔
- **hide-inputs**: 隱藏內建的輸入框（使用外部的文字輸入框）
- **swatches**: 傳入預設顏色陣列
- **show-swatches**: 顯示色票選擇器

#### 列表結構
```
下拉選單
├── Selected（已選擇）
│   ├── 標籤 1 [✓] [顏色點] [名稱] [X]
│   ├── 標籤 2 [✓] [顏色點] [名稱] [X]
│   └── ...
├── Available（可選擇）
│   ├── 標籤 A [顏色點] [名稱]
│   ├── 標籤 B [顏色點] [名稱]
│   └── ...
└── 操作按鈕
    ├── Create Label
    └── Manage Labels
```

### 📝 使用範例

```vue
<script setup lang="ts">
import LabelSelector from '@/components/ui/LabelSelector.vue'

const selectedLabels = ref<Label[]>([
  { id: '1', name: 'confirmed', color: '#f44336' },
])

const availableLabels = ref<Label[]>([
  { id: '1', name: 'confirmed', color: '#f44336' },
  { id: '2', name: 'critical', color: '#ff5722' },
  { id: '3', name: 'enhancement', color: '#4caf50' },
  { id: '4', name: 'bug', color: '#e91e63' },
])
</script>

<template>
  <LabelSelector
    v-model="selectedLabels"
    :available-labels="availableLabels"
    @create="handleCreateLabel"
    @manage="handleManageLabels"
  />
</template>
```

### 🎯 效果展示

**之前**:
- ❌ 下拉選單只顯示已選擇的標籤
- ❌ 沒有可選擇的標籤列表
- ❌ 點擊顏色框無反應
- ❌ 搜尋功能無實際作用

**現在**:
- ✅ 顯示已選擇的標籤（Selected）
- ✅ 顯示可選擇的標籤（Available）
- ✅ 點擊可選擇的標籤即可選中
- ✅ 點擊顏色框出現完整調色盤
- ✅ 搜尋框可以即時過濾標籤
- ✅ Hover 效果提升互動體驗

### 🐛 修復的問題

1. **標籤列表為空**: 添加了 `availableLabels` prop 的使用和顯示
2. **搜尋無效**: 實作了 `filteredAvailableLabels` 計算屬性
3. **無法選擇標籤**: 為未選擇的標籤添加了點擊事件
4. **顏色選擇器缺失**: 整合了 VColorPicker 元件

### 📌 注意事項

1. 確保傳入 `availableLabels` prop，否則下拉選單中不會顯示可選擇的標籤
2. 顏色選擇器使用 HEXA 格式，包含透明度
3. 搜尋功能會同時影響已選擇和未選擇的標籤顯示
4. 點擊已選擇的標籤旁的 X 按鈕會取消選擇
5. 點擊未選擇的標籤整列會選中該標籤

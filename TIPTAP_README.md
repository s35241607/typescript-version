# Tiptap 富文本編輯器範例

這是一個基於 [Tiptap](https://tiptap.dev/) 構建的富文本編輯器範例，整合了 Vuetify UI 組件庫。

## 功能特色

### 🎯 核心功能
- **文字格式化**：粗體、斜體、底線、刪除線、行內程式碼
- **標題支持**：H1-H3 標題等級選擇
- **文字顏色**：支持自定義文字顏色和高亮顯示
- **對齊方式**：左對齊、置中、右對齊
- **列表項目**：有序列表和無序列表
- **引用區塊**：支持引用格式
- **程式碼區塊**：支持程式碼高亮顯示
- **圖片插入**：支持 URL 圖片插入
- **連結功能**：支持超連結插入和移除
- **格式清除**：一鍵清除所有格式

### 🎨 UI/UX 特色
- **響應式設計**：自適應不同螢幕尺寸
- **主題支持**：支持明暗主題切換
- **Vuetify 整合**：使用 Material Design 組件
- **可配置性**：支持禁用、高度調整、工具欄顯示/隱藏

## 檔案結構

```
src/
├── components/
│   └── TiptapEditor.vue      # 主要編輯器元件
├── pages/
│   └── TiptapDemo.vue        # 示範頁面
├── plugins/router/
│   └── routes.ts             # 路由配置
└── layouts/components/
    └── NavItems.vue          # 導航選項
```

## 元件使用方式

### 基本使用

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from '@/components/TiptapEditor.vue'

const content = ref('<p>初始內容</p>')

const onEditorReady = editor => {
  console.log('編輯器已準備就緒:', editor)
}
</script>

<template>
  <TiptapEditor
    v-model="content"
    placeholder="請輸入內容..."
    :height="400"
    @ready="onEditorReady"
  />
</template>
```

### 進階配置

```vue
<script setup>
import { ref } from 'vue'
import TiptapEditor from '@/components/TiptapEditor.vue'

const content = ref('')
const isReadOnly = ref(false)
const showControls = ref(true)

const handleReady = editor => {
  // 編輯器實例可用於進階操作
  // editor.commands.focus()
  // editor.getHTML()
  // editor.getText()
}
</script>

<template>
  <TiptapEditor
    v-model="content"
    :disabled="isReadOnly"
    :show-toolbar="showControls"
    height="500px"
    placeholder="開始創作..."
    @ready="handleReady"
  />
</template>
```

## Props 屬性

| 屬性名 | 類型 | 預設值 | 說明 |
|--------|------|--------|------|
| `modelValue` | `string` | `''` | 編輯器內容（HTML） |
| `placeholder` | `string` | `'Type something...'` | 占位符文字 |
| `disabled` | `boolean` | `false` | 是否禁用編輯器 |
| `height` | `string \| number` | `'200px'` | 編輯器高度 |
| `showToolbar` | `boolean` | `true` | 是否顯示工具欄 |

## Events 事件

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `update:modelValue` | `value: string` | 內容變更時觸發 |
| `ready` | `editor: Editor` | 編輯器準備就緒時觸發 |

## 暴露方法

| 方法名 | 返回值 | 說明 |
|--------|--------|------|
| `getEditor()` | `Editor` | 獲取編輯器實例 |
| `getHTML()` | `string` | 獲取 HTML 內容 |
| `getText()` | `string` | 獲取純文字內容 |
| `setContent(content)` | `void` | 設置編輯器內容 |
| `focus()` | `void` | 聚焦到編輯器 |

## 訪問示範頁面

啟動開發伺服器後，可以通過以下方式訪問示範頁面：

1. **直接 URL 訪問**：`http://localhost:5175/typescript-version/tiptap-demo`
2. **側邊欄導航**：在 "Apps & Pages" 區段下點選 "Tiptap Editor Demo"

## 技術實現

### 依賴套件
- `@tiptap/vue-3`: Tiptap Vue 3 整合
- `@tiptap/starter-kit`: 基礎功能套件
- `@tiptap/extension-image`: 圖片支持
- `@tiptap/extension-link`: 連結支持
- `@tiptap/extension-text-style`: 文字樣式
- `@tiptap/extension-color`: 文字顏色
- `@tiptap/extension-highlight`: 文字高亮
- `@tiptap/extension-text-align`: 文字對齊
- `@tiptap/extension-underline`: 底線支持

### 主要特性
- **TypeScript 支持**：完整的型別定義
- **Composition API**：使用 Vue 3 Composition API
- **響應式設計**：支持行動裝置
- **主題整合**：與 Vuetify 主題系統深度整合
- **可訪問性**：遵循 WCAG 可訪問性指南

## 自定義樣式

編輯器支持 CSS 自定義變數，可以通過覆寫以下變數來自定義樣式：

```scss
.tiptap-editor {
  // 工具欄樣式
  .tiptap-toolbar {
    background: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }
  
  // 編輯區樣式
  .tiptap-content {
    background: rgb(var(--v-theme-surface));
  }
  
  // 編輯器內容樣式
  .tiptap-editor-content {
    color: rgb(var(--v-theme-on-surface));
    font-family: inherit;
  }
}
```

## 擴展功能

要添加更多 Tiptap 擴展功能，請參考 [Tiptap Extensions 文檔](https://tiptap.dev/api/extensions)。

例如添加表格支持：

```bash
pnpm add @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header
```

```typescript
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

// 在 extensions 陣列中添加
extensions: [
  // ... 其他擴展
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
]
```

## 效能優化

- 使用 `shallowRef` 優化大型文檔的響應式性能
- 實作虛擬滾動處理大量內容
- 使用防抖處理內容變更事件
- 圖片懶加載和壓縮

## 故障排除

### 常見問題

1. **樣式不正確顯示**
   - 確保已正確導入 Vuetify 主題
   - 檢查 CSS 變數是否正確設置

2. **編輯器無法聚焦**
   - 確認 `disabled` 屬性設置
   - 檢查編輯器是否已正確初始化

3. **內容同步問題**
   - 確保使用 `v-model` 雙向綁定
   - 檢查 `update:modelValue` 事件處理

## 貢獻指南

1. Fork 此專案
2. 建立功能分支：`git checkout -b feature/AmazingFeature`
3. 提交變更：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權條款。詳情請見 [LICENSE](LICENSE) 檔案。

## 相關連結

- [Tiptap 官方文檔](https://tiptap.dev/)
- [Vuetify 官方網站](https://vuetifyjs.com/)
- [Vue 3 文檔](https://vuejs.org/)
- [TypeScript 文檔](https://www.typescriptlang.org/)

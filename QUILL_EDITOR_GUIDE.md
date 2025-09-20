# QuillEditor 使用說明

## 功能特色

### ✅ **完全免費**
- Quill.js 是完全開源且免費的富文本編輯器
- 無需授權費用，可安心使用於商業專案

### 🎨 **主題支援**
- 自動適配 Vuetify 的明亮/暗色主題切換
- 編輯器顏色會隨著系統主題自動調整

### 🖼️ **圖片支援**
- **Ctrl + V 貼上圖片**：直接從剪貼簿貼上圖片
- **拖放上傳**：可將圖片拖放到編輯器中
- **點擊上傳**：工具列圖片按鈕選擇檔案
- 圖片自動轉換為 base64 格式儲存

### 🛠️ **豐富工具列**
- 標題樣式 (H1-H6)
- 文字格式：粗體、斜體、底線、刪除線
- 顏色：文字顏色、背景顏色
- 對齊：左對齊、置中、右對齊
- 列表：有序列表、無序列表、縮排
- 引用、程式碼區塊
- 連結插入
- 清除格式

### 🔧 **技術規格**
- Vue 3 + TypeScript 支援
- 響應式設計
- 可自訂高度
- 支援禁用狀態
- 事件監聽 (ready, update)

## 使用方式

```vue
<script setup>
import QuillEditor from '@/components/QuillEditor.vue'

const content = ref('')

const onEditorReady = editor => {
  console.log('編輯器已準備就緒', editor)
}
</script>

<template>
  <QuillEditor
    v-model="content"
    :height="300"
    placeholder="請輸入內容..."
    @ready="onEditorReady"
  />
</template>
```

## 替換 TinyMCE 的優勢

| 功能 | TinyMCE | QuillEditor |
|------|---------|-------------|
| 授權費用 | 💰 需要購買 | ✅ 完全免費 |
| 圖片貼上 | ✅ 支援 | ✅ 支援 |
| 主題切換 | ⚠️ 需要配置 | ✅ 自動適配 |
| 檔案大小 | 📦 較大 | 📦 較小 |
| 自訂性 | 🔧 高度可客製 | 🔧 適度可客製 |
| 社群支援 | 👥 商業支援 | 👥 開源社群 |

## 快速上手

1. **基本使用**：直接綁定 v-model 即可
2. **圖片貼上**：按 Ctrl + V 或點擊工具列圖片按鈕
3. **主題切換**：編輯器會自動跟隨 Vuetify 主題
4. **高度調整**：設定 height 屬性調整編輯區高度

立即體驗完全免費的富文本編輯器！ 🚀

# QuillEditor Mention 功能使用指南

## 🎯 新增功能

### ✅ **@Mention 功能**
- 在編輯器中輸入 `@` 自動彈出用戶選擇列表
- 支援鍵盤導航（上下箭頭、Enter、Escape）
- 支援滑鼠點擊選擇
- 支援用戶名稱和電子郵件搜尋過濾

## 🔧 使用方式

### 基本用法
```vue
<script setup>
import QuillEditor from '@/components/QuillEditor.vue'

const content = ref('')

// 定義可以被 mention 的用戶列表
const mentionUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
  },
  {
    id: 2,
    name: '王小明',
    email: 'wang@example.com',
    avatar: '', // 沒有頭像會顯示名字首字母
  },
]

// 處理 mention 事件
const handleMention = user => {
  console.log('提及用戶:', user)

  // 可以在這裡發送通知給被提及的用戶
}
</script>

<template>
  <QuillEditor
    v-model="content"
    :mention-users="mentionUsers"
    :enable-mention="true"
    @mention="handleMention"
  />
</template>
```

### 進階配置
```vue
<QuillEditor
  v-model="content"
  :mention-users="mentionUsers"
  :enable-mention="true"
  :height="400"
  placeholder="輸入 @ 來提及其他用戶..."
  @mention="handleMention"
  @ready="onEditorReady"
/>
```

## 🎮 操作方式

### 1. **觸發 Mention**
- 在編輯器中輸入 `@` 字符
- 自動彈出用戶選擇列表

### 2. **搜尋用戶**
- 輸入 `@john` 會過濾包含 "john" 的用戶
- 支援名稱和電子郵件搜尋
- 支援中文用戶名搜尋

### 3. **選擇用戶**
- **鍵盤操作**：
  - `↑` `↓` 上下選擇用戶
  - `Enter` 確認選擇
  - `Escape` 取消選擇
- **滑鼠操作**：
  - 滑鼠懸停自動選中
  - 點擊確認選擇

### 4. **Mention 樣式**
- 被 mention 的用戶會以特殊樣式顯示
- 主題色彩背景，易於識別
- 支援明亮/暗色主題自動適配

## 📋 Props 說明

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `mentionUsers` | `Array` | `[]` | 可被 mention 的用戶列表 |
| `enableMention` | `Boolean` | `true` | 是否啟用 mention 功能 |

### mentionUsers 物件結構
```typescript
interface MentionUser {
  id: string | number    // 用戶唯一識別碼
  name: string          // 用戶顯示名稱
  email?: string        // 用戶電子郵件（選用）
  avatar?: string       // 用戶頭像 URL（選用）
}
```

## 🎨 事件說明

### @mention 事件
```typescript
// 當用戶被 mention 時觸發
const handleMention = (user: MentionUser) => {
  console.log('被提及的用戶:', user)
  
  // 實際使用場景：
  // 1. 發送通知給被提及的用戶
  // 2. 記錄 mention 關係
  // 3. 更新工單的參與者列表
  // 4. 觸發工作流程
}
```

## 🎯 實際應用場景

### 1. **工單系統**
```vue
<!-- 在工單描述中 mention 負責人 -->
<QuillEditor
  v-model="ticketForm.description"
  :mention-users="teamMembers"
  placeholder="描述問題... 使用 @name 來指派給團隊成員"
  @mention="assignToUser"
/>
```

### 2. **評論系統**
```vue
<!-- 在評論中 mention 其他用戶 -->
<QuillEditor
  v-model="comment.content"
  :mention-users="projectMembers"
  placeholder="添加評論... @someone 來通知其他成員"
  @mention="notifyUser"
/>
```

### 3. **協作編輯**
```vue
<!-- 在文檔中 mention 協作者 -->
<QuillEditor
  v-model="document.content"
  :mention-users="collaborators"
  placeholder="編輯文檔... @reviewer 來請求審核"
  @mention="requestReview"
/>
```

## 🚀 功能特色

- ✅ **即時搜尋過濾**：輸入時即時過濾用戶列表
- ✅ **鍵盤友好**：完整的鍵盤導航支援
- ✅ **主題適配**：自動適配明亮/暗色主題
- ✅ **用戶頭像**：支援頭像顯示，無頭像顯示首字母
- ✅ **事件通知**：mention 完成時觸發事件
- ✅ **樣式整合**：完美整合 Vuetify 設計系統
- ✅ **國際化支援**：支援中英文用戶名搜尋

開始使用 @mention 功能，讓團隊協作更加高效！🎉

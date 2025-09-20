<script lang="ts" setup>
import { ref } from 'vue'
import QuillEditor from '@/components/QuillEditor.vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

const snackbarStore = useSnackbarStore()

const content = ref('')

const testUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://cdn.vuetifyjs.com/images/jane.jpg',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: '',
  },
  {
    id: 4,
    name: '王小明',
    email: 'wang@example.com',
    avatar: '',
  },
  {
    id: 5,
    name: '李小華',
    email: 'li@example.com',
    avatar: '',
  },
]

const handleMention = (user: any) => {
  console.log('Mentioned user:', user)
  snackbarStore.show(`提及了 ${user.name}`, 'success')
}

const handleEditorReady = (editor: any) => {
  console.log('Editor ready:', editor)
}
</script>

<template>
  <VContainer>
    <VCard>
      <VCardTitle>
        <VIcon
          icon="ri-at-line"
          class="me-2"
        />
        Mention 功能測試
      </VCardTitle>

      <VCardText>
        <div class="mb-4">
          <h3>測試說明：</h3>
          <ul class="mt-2">
            <li>在編輯器中輸入 <code>@</code> 觸發用戶列表</li>
            <li>使用 ↑↓ 鍵導航，Enter 鍵選擇</li>
            <li>輸入用戶名進行搜尋</li>
            <li>測試用戶：John, Jane, Mike, 王小明, 李小華</li>
          </ul>
        </div>

        <QuillEditor
          v-model="content"
          :mention-users="testUsers"
          enable-mention
          :height="300"
          placeholder="輸入 @ 開始測試 mention 功能..."
          @mention="handleMention"
          @ready="handleEditorReady"
        />

        <div class="mt-4">
          <h4>編輯器內容 (HTML):</h4>
          <VCard
            variant="outlined"
            class="pa-3 mt-2"
          >
            <pre style="white-space: pre-wrap; font-family: monospace;">{{ content || '(空白)' }}</pre>
          </VCard>
        </div>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped>
code {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
</style>

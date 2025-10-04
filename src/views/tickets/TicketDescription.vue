<script lang="ts" setup>
// 👉 Props
interface Reporter {
  id: number
  name: string
  avatar?: string
  email: string
}

interface Props {
  description: string
  reporter: Reporter
}

defineProps<Props>()
</script>

<template>
  <VCard data-activity="ticket-description-card">
    <VCardText>
      <!-- 作者資訊 -->
      <div class="d-flex align-center gap-3 mb-4">
        <VAvatar
          :color="reporter.avatar ? undefined : 'primary'"
          size="40"
        >
          <VImg
            v-if="reporter.avatar"
            :src="reporter.avatar"
            :alt="reporter.name"
          />
          <span
            v-else
            class="text-sm"
          >
            {{ reporter.name.charAt(0).toUpperCase() }}
          </span>
        </VAvatar>
        <div>
          <div class="font-weight-semibold">
            {{ reporter.name }}
          </div>
          <div class="text-body-2 text-medium-emphasis">
            {{ reporter.email }}
          </div>
        </div>
      </div>

      <!-- 描述內容 -->
      <VDivider class="mb-4" />
      <div
        class="ticket-description-content"
        v-html="renderMarkdown(description)"
      />
    </VCardText>
  </VCard>
</template>

<script lang="ts">
// 簡易 Markdown 渲染（實際專案應使用 marked 或 markdown-it 等套件）
function renderMarkdown(text: string): string {
  let html = text
  
  // 標題
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 粗體
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 斜體
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 連結
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 程式碼區塊
  html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
  
  // 行內程式碼
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 無序列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // 核取方塊
  html = html.replace(/\- \[ \] (.*$)/gim, '<div class="checkbox-item"><input type="checkbox" disabled> $1</div>')
  html = html.replace(/\- \[x\] (.*$)/gim, '<div class="checkbox-item"><input type="checkbox" checked disabled> $1</div>')
  
  // 段落
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  return html
}

export { renderMarkdown }
</script>

<style lang="scss" scoped>
.ticket-description-content {
  line-height: 1.7;

  :deep(h1) {
    font-size: 1.75rem;
    font-weight: 600;
    margin-block-end: 1rem;
    margin-block-start: 1.5rem;
  }

  :deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-block-end: 0.875rem;
    margin-block-start: 1.25rem;
  }

  :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-block-end: 0.75rem;
    margin-block-start: 1rem;
  }

  :deep(p) {
    margin-block-end: 1rem;
  }

  :deep(ul) {
    margin-block-end: 1rem;
    margin-inline-start: 1.5rem;
  }

  :deep(li) {
    margin-block-end: 0.5rem;
  }

  :deep(code) {
    padding: 0.125rem 0.375rem;
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
  }

  :deep(pre) {
    padding: 1rem;
    background-color: rgba(var(--v-theme-surface-variant), 0.2);
    border-radius: 6px;
    overflow-x: auto;
    margin-block-end: 1rem;

    code {
      padding: 0;
      background-color: transparent;
      font-size: 0.875rem;
    }
  }

  :deep(a) {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(.checkbox-item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-block-end: 0.5rem;

    input[type="checkbox"] {
      margin: 0;
    }
  }
}
</style>

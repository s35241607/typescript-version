<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import QuillEditor from '@/components/QuillEditor.vue'

// 頁面標題
defineOptions({
  name: 'CreateTicketPage',
})

// 路由和狀態管理
const router = useRouter()
const snackbarStore = useSnackbarStore()

// 表單引用和狀態
const formRef = ref()
const isFormValid = ref(false)
const isSubmitting = ref(false)

// 表單資料
const ticketForm = reactive({
  title: '',
  description: '',
  priority: 'medium',
  type: 'task',
  assignees: [],
  labels: [],
  milestone: null,
})

// 表單驗證規則
const titleRules = [
  (v: string) => !!v || '標題為必填項目',
  (v: string) => v.length >= 3 || '標題至少需要 3 個字元',
  (v: string) => v.length <= 100 || '標題不能超過 100 個字元',
]

// 表單驗證規則

// 優先級選項
const priorityOptions = [
  { label: '低', value: 'low', icon: 'ri-arrow-down-line', color: 'success' },
  { label: '中', value: 'medium', icon: 'ri-subtract-line', color: 'warning' },
  { label: '高', value: 'high', icon: 'ri-arrow-up-line', color: 'error' },
  { label: '緊急', value: 'critical', icon: 'ri-alarm-warning-line', color: 'error' },
]

// 類型選項
const typeOptions = [
  { label: '任務', value: 'task', icon: 'ri-task-line' },
  { label: '錯誤', value: 'bug', icon: 'ri-bug-line' },
  { label: '功能', value: 'feature', icon: 'ri-lightbulb-line' },
  { label: '改進', value: 'enhancement', icon: 'ri-rocket-line' },
  { label: '文件', value: 'documentation', icon: 'ri-file-text-line' },
]

// 模擬用戶資料
const availableUsers = [
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
    avatar: 'https://cdn.vuetifyjs.com/images/mike.jpg',
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

// Mention 用戶列表（可以和 availableUsers 不同，用於 @mention 功能）
const mentionUsers = [
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
    avatar: 'https://cdn.vuetifyjs.com/images/mike.jpg',
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
  {
    id: 6,
    name: '張三',
    email: 'zhang@example.com',
    avatar: '',
  },
  {
    id: 7,
    name: '李四',
    email: 'li4@example.com',
    avatar: '',
  },
]

// 模擬標籤資料
const availableLabels = [
  { id: 1, name: 'Frontend', description: '前端相關', color: 'primary' },
  { id: 2, name: 'Backend', description: '後端相關', color: 'secondary' },
  { id: 3, name: 'UI/UX', description: '使用者介面設計', color: 'info' },
  { id: 4, name: 'Critical', description: '重要問題', color: 'error' },
  { id: 5, name: 'Enhancement', description: '功能增強', color: 'success' },
]

// 模擬里程碑資料
const availableMilestones = [
  { id: 1, title: 'Version 1.0', dueDate: '2024-12-31' },
  { id: 2, title: 'Sprint 1', dueDate: '2024-11-15' },
  { id: 3, title: 'Beta Release', dueDate: '2024-10-30' },
]

// 檢查是否有未儲存的變更
const hasUnsavedChanges = computed(() => {
  return ticketForm.title.trim() !== '' || ticketForm.description.trim() !== ''
})

// 輔助函數
const getPriorityColor = (priority: string) => {
  const option = priorityOptions.find(p => p.value === priority)

  return option?.color || 'primary'
}

const getPriorityLabel = (priority: string) => {
  const option = priorityOptions.find(p => p.value === priority)

  return option?.label || priority
}

const getTypeLabel = (type: string) => {
  const option = typeOptions.find(t => t.value === type)

  return option?.label || type
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-TW')
}

// 安全的 HTML 處理
const getSafeHtml = (html: string) => {
  // 這裡可以使用 DOMPurify 或其他 sanitizer
  // 目前為了演示，僅移除 script 標籤
  return html.replace(/<script[^>]*>.*?<\/script>/gi, '')
}

// Mention 事件處理
const handleMention = (user: any) => {
  console.log('提及用戶:', user)
  snackbarStore.show(`提及了 ${user.name}`, 'info')
}

// 表單處理
const handleSubmit = async () => {
  if (!isFormValid.value)
    return

  try {
    isSubmitting.value = true

    // 模擬 API 調用
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 這裡會調用實際的 API
    console.log('建立 Ticket:', ticketForm)

    snackbarStore.show('Ticket 建立成功！', 'success')

    // 重定向到票券列表或詳情頁
    router.push('/tickets')
  }
  catch (error) {
    console.error('建立 Ticket 失敗:', error)
    snackbarStore.show('建立 Ticket 失敗，請稍後再試', 'error')
  }
  finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    // eslint-disable-next-line no-alert
    if (confirm('您有未儲存的變更，確定要離開嗎？'))
      router.back()
  }
  else {
    router.back()
  }
}
</script>

<template>
  <VContainer
    fluid
    class="create-ticket-page"
  >
    <VRow>
      <VCol cols="12">
        <!-- 頁面標題 -->
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <h1 class="text-h4 font-weight-bold mb-2">
              建立新 Ticket
            </h1>
            <p class="text-body-1 text-medium-emphasis">
              填寫詳細資訊來建立一個新的 Ticket
            </p>
          </div>
          <VBtn
            variant="text"
            color="primary"
            prepend-icon="ri-arrow-left-line"
            @click="$router.back()"
          >
            返回
          </VBtn>
        </div>
      </VCol>
    </VRow>

    <VRow>
      <!-- 主要內容區域 -->
      <VCol
        cols="12"
        lg="8"
      >
        <VCard class="mb-6">
          <VCardTitle class="d-flex align-center">
            <VIcon
              icon="ri-ticket-line"
              class="me-2"
            />
            Ticket 資訊
          </VCardTitle>
          <VCardText>
            <VForm
              ref="formRef"
              v-model="isFormValid"
              @submit.prevent="handleSubmit"
            >
              <!-- 標題 -->
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="ticketForm.title"
                    label="標題"
                    placeholder="請輸入 Ticket 標題..."
                    variant="outlined"
                    density="comfortable"
                    :rules="titleRules"
                    prepend-inner-icon="ri-text"
                    required
                  />
                </VCol>
              </VRow>

              <!-- 內容編輯器 -->
              <VRow>
                <VCol cols="12">
                  <VLabel class="text-body-2 font-weight-medium mb-2">
                    內容描述 *
                    <VChip
                      size="x-small"
                      color="info"
                      variant="tonal"
                      class="ml-2"
                    >
                      支援 @mention
                    </VChip>
                  </VLabel>
                  <QuillEditor
                    v-model="ticketForm.description"
                    :height="300"
                    :mention-users="mentionUsers"
                    :enable-mention="true"
                    placeholder="請輸入工單內容... 輸入 @ 可以提及其他用戶"
                    class="mb-4"
                    @mention="handleMention"
                  />
                </VCol>
              </VRow>

              <!-- 優先級 -->
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="ticketForm.priority"
                    label="優先級"
                    :items="priorityOptions"
                    item-title="label"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="ri-flag-line"
                  >
                    <template #item="{ props, item }">
                      <VListItem
                        v-bind="props"
                        :prepend-icon="item.raw.icon"
                      >
                        <VListItemTitle>
                          {{ item.raw.label }}
                        </VListItemTitle>
                      </VListItem>
                    </template>
                  </VSelect>
                </VCol>

                <!-- 類型 -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="ticketForm.type"
                    label="類型"
                    :items="typeOptions"
                    item-title="label"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="ri-apps-line"
                  >
                    <template #item="{ props, item }">
                      <VListItem
                        v-bind="props"
                        :prepend-icon="item.raw.icon"
                      >
                        <VListItemTitle>
                          {{ item.raw.label }}
                        </VListItemTitle>
                      </VListItem>
                    </template>
                  </VSelect>
                </VCol>
              </VRow>

              <!-- 操作按鈕 -->
              <VRow class="mt-4">
                <VCol cols="12">
                  <div class="d-flex gap-3">
                    <VBtn
                      type="submit"
                      color="primary"
                      variant="flat"
                      size="large"
                      prepend-icon="ri-add-line"
                      :loading="isSubmitting"
                      :disabled="!isFormValid"
                    >
                      建立 Ticket
                    </VBtn>
                    <VBtn
                      variant="outlined"
                      size="large"
                      @click="handleCancel"
                    >
                      取消
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 側邊欄 -->
      <VCol
        cols="12"
        lg="4"
      >
        <!-- 指派人員 -->
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon
              icon="ri-user-line"
              class="me-2"
            />
            指派人員
          </VCardTitle>
          <VCardText>
            <VAutocomplete
              v-model="ticketForm.assignees"
              label="選擇指派人員"
              :items="availableUsers"
              item-title="name"
              item-value="id"
              variant="outlined"
              density="comfortable"
              multiple
              chips
              closable-chips
              prepend-inner-icon="ri-user-search-line"
              no-data-text="沒有找到使用者"
            >
              <template #chip="{ props, item }">
                <VChip
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  size="small"
                >
                  {{ item.raw.name }}
                </VChip>
              </template>
              <template #item="{ props, item }">
                <VListItem
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                >
                  <VListItemTitle>{{ item.raw.name }}</VListItemTitle>
                  <VListItemSubtitle>{{ item.raw.email }}</VListItemSubtitle>
                </VListItem>
              </template>
            </VAutocomplete>
          </VCardText>
        </VCard>

        <!-- 標籤 -->
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon
              icon="ri-price-tag-3-line"
              class="me-2"
            />
            標籤
          </VCardTitle>
          <VCardText>
            <VAutocomplete
              v-model="ticketForm.labels"
              label="選擇標籤"
              :items="availableLabels"
              item-title="name"
              item-value="id"
              variant="outlined"
              density="comfortable"
              multiple
              chips
              closable-chips
              prepend-inner-icon="ri-hashtag"
              no-data-text="沒有找到標籤"
            >
              <template #chip="{ props, item }">
                <VChip
                  v-bind="props"
                  :color="item.raw.color"
                  size="small"
                >
                  {{ item.raw.name }}
                </VChip>
              </template>
              <template #item="{ props, item }">
                <VListItem v-bind="props">
                  <template #prepend>
                    <VIcon
                      :color="item.raw.color"
                      icon="ri-circle-fill"
                      size="small"
                    />
                  </template>
                  <VListItemTitle>{{ item.raw.name }}</VListItemTitle>
                  <VListItemSubtitle>{{ item.raw.description }}</VListItemSubtitle>
                </VListItem>
              </template>
            </VAutocomplete>
          </VCardText>
        </VCard>

        <!-- 里程碑 -->
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon
              icon="ri-milestone-line"
              class="me-2"
            />
            里程碑
          </VCardTitle>
          <VCardText>
            <VSelect
              v-model="ticketForm.milestone"
              label="選擇里程碑"
              :items="availableMilestones"
              item-title="title"
              item-value="id"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="ri-flag-2-line"
              clearable
            >
              <template #item="{ props, item }">
                <VListItem v-bind="props">
                  <VListItemTitle>{{ item.raw.title }}</VListItemTitle>
                  <VListItemSubtitle>
                    截止日期: {{ formatDate(item.raw.dueDate) }}
                  </VListItemSubtitle>
                </VListItem>
              </template>
            </VSelect>
          </VCardText>
        </VCard>

        <!-- 預覽卡片 -->
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon
              icon="ri-eye-line"
              class="me-2"
            />
            預覽
          </VCardTitle>
          <VCardText>
            <div class="preview-content">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                {{ ticketForm.title || '標題預覽' }}
              </h3>
              <div class="d-flex gap-2 mb-3">
                <VChip
                  v-if="ticketForm.priority"
                  :color="getPriorityColor(ticketForm.priority)"
                  size="small"
                >
                  {{ getPriorityLabel(ticketForm.priority) }}
                </VChip>
                <VChip
                  v-if="ticketForm.type"
                  color="info"
                  size="small"
                >
                  {{ getTypeLabel(ticketForm.type) }}
                </VChip>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div
                v-if="ticketForm.description"
                class="preview-description"
                v-html="getSafeHtml(ticketForm.description)"
              />
              <div
                v-else
                class="text-medium-emphasis"
              >
                內容描述將顯示在這裡...
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.create-ticket-page {
  min-height: 100vh;
}

.preview-content {
  .preview-description {
    max-height: 200px;
    overflow-y: auto;
    padding: 12px;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
    background: rgba(var(--v-theme-surface), 0.5);

    :deep(p) {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(ul, ol) {
      margin: 8px 0;
      padding-left: 20px;
    }

    :deep(h1, h2, h3, h4, h5, h6) {
      margin: 12px 0 8px 0;
      font-weight: 600;
    }
  }
}

:deep(.v-text-field) {
  .v-field__input {
    min-height: 56px;
  }
}

:deep(.v-select) {
  .v-field__input {
    min-height: 56px;
  }
}

:deep(.v-autocomplete) {
  .v-field__input {
    min-height: 56px;
  }
}
</style>

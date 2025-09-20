<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Data
const loading = ref(false)

const tickets = ref([
  {
    id: 1,
    title: '系統登入問題',
    status: 'open',
    priority: 'high',
    assignee: 'John Doe',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '資料匯出功能異常',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Jane Smith',
    createdAt: '2024-01-14',
  },
  {
    id: 3,
    title: '新增使用者權限',
    status: 'resolved',
    priority: 'low',
    assignee: 'Bob Johnson',
    createdAt: '2024-01-13',
  },
])

// Table headers
const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: '標題', key: 'title', sortable: true },
  { title: '狀態', key: 'status', sortable: true },
  { title: '優先級', key: 'priority', sortable: true },
  { title: '負責人', key: 'assignee', sortable: true },
  { title: '建立日期', key: 'createdAt', sortable: true },
  { title: '操作', key: 'actions', sortable: false },
]

// Methods
const getStatusColor = (status: string) => {
  const colors = {
    'open': 'error',
    'in-progress': 'warning',
    'resolved': 'success',
    'closed': 'secondary',
  }

  return colors[status] || 'primary'
}

const getStatusText = (status: string) => {
  const texts = {
    'open': '開放',
    'in-progress': '處理中',
    'resolved': '已解決',
    'closed': '已關閉',
  }

  return texts[status] || status
}

const getPriorityColor = (priority: string) => {
  const colors = {
    low: 'success',
    medium: 'warning',
    high: 'error',
    urgent: 'error',
  }

  return colors[priority] || 'primary'
}

const getPriorityText = (priority: string) => {
  const texts = {
    low: '低',
    medium: '中',
    high: '高',
    urgent: '緊急',
  }

  return texts[priority] || priority
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-TW')
}

const viewTicket = (id: number) => {
  router.push(`/tickets/${id}`)
}

const editTicket = (id: number) => {
  router.push(`/tickets/${id}/edit`)
}

onMounted(() => {
  // 在這裡可以加入 API 呼叫來載入實際的工單資料
})
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center justify-space-between">
      <span>工單列表</span>
      <VBtn
        color="primary"
        variant="elevated"
        prepend-icon="ri-add-line"
        @click="$router.push('/tickets/create')"
      >
        建立工單
      </VBtn>
    </VCardTitle>

    <VCardText>
      <VDataTable
        :headers="headers"
        :items="tickets"
        :loading="loading"
        item-value="id"
        class="elevation-1"
      >
        <template #item.status="{ item }">
          <VChip
            :color="getStatusColor(item.status)"
            size="small"
            variant="tonal"
          >
            {{ getStatusText(item.status) }}
          </VChip>
        </template>

        <template #item.priority="{ item }">
          <VChip
            :color="getPriorityColor(item.priority)"
            size="small"
            variant="outlined"
          >
            {{ getPriorityText(item.priority) }}
          </VChip>
        </template>

        <template #item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <template #item.actions="{ item }">
          <VBtn
            icon="ri-eye-line"
            variant="text"
            size="small"
            @click="viewTicket(item.id)"
          />
          <VBtn
            icon="ri-edit-line"
            variant="text"
            size="small"
            @click="editTicket(item.id)"
          />
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

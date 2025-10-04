<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TicketDetailHeader from '@/views/tickets/TicketDetailHeader.vue'
import TicketDetailMainContent from '@/views/tickets/TicketDetailMainContent.vue'
import TicketDetailSidebar from '@/views/tickets/TicketDetailSidebar.vue'

// 👉 路由實例
const route = useRoute()

// 👉 取得工單 ID
const ticketId = computed(() => route.params.id as string)

// 👉 工單資料（模擬資料，實際應從 API 取得）
interface TicketLabel {
  id: number
  name: string
  color: string
  description?: string
}

interface TimelineItem {
  id: number
  type: 'comment' | 'status_change' | 'assignee_change' | 'label_change' | 'created'
  user: {
    name: string
    avatar?: string
  }
  timestamp: string
  content?: string
  changes?: {
    field: string
    oldValue: string
    newValue: string
  }
}

interface Ticket {
  id: number
  reference: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  project: string
  assignee: {
    id: number
    name: string
    avatar?: string
    email: string
  } | null
  reporter: {
    id: number
    name: string
    avatar?: string
    email: string
  }
  labels: TicketLabel[]
  createdAt: string
  updatedAt: string
  dueDate: string | null
  watchers: number
  isWatching: boolean
  visibility: 'public' | 'private' | 'team'
  timeline: TimelineItem[]
}

// 模擬資料
const ticket = ref<Ticket>({
  id: 6,
  reference: '#6',
  title: 'Enable email registration',
  description: `## Overview
Allow new members to sign up with email verification to improve accessibility and user onboarding.

## Current Behavior
Currently, users can only register through social authentication (Google, GitHub).

## Expected Behavior
- Add email/password registration form
- Implement email verification flow
- Send welcome email after verification

## Technical Requirements
- Use existing authentication service
- Add rate limiting to prevent spam
- Store verification tokens securely

## Acceptance Criteria
- [ ] User can register with email and password
- [ ] Verification email is sent immediately
- [ ] Email contains secure verification link
- [ ] Link expires after 24 hours
- [ ] User receives welcome email after verification`,
  status: 'in_progress',
  priority: 'high',
  project: 'Authentication',
  assignee: {
    id: 1,
    name: 'Lan Chen',
    avatar: undefined,
    email: 'lan@example.com',
  },
  reporter: {
    id: 2,
    name: 'Sarah Johnson',
    avatar: undefined,
    email: 'sarah@example.com',
  },
  labels: [
    { id: 1, name: 'enhancement', color: '#56CA00', description: 'New feature or request' },
    { id: 2, name: 'high-priority', color: '#FF4C51', description: 'High priority issue' },
    { id: 3, name: 'backend', color: '#16B1FF', description: 'Backend related' },
  ],
  createdAt: '2024-08-20T10:30:00Z',
  updatedAt: '2024-08-27T14:25:00Z',
  dueDate: '2024-09-15T23:59:59Z',
  watchers: 5,
  isWatching: true,
  visibility: 'public',
  timeline: [
    {
      id: 1,
      type: 'created',
      user: {
        name: 'Sarah Johnson',
        avatar: undefined,
      },
      timestamp: '2024-08-20T10:30:00Z',
    },
    {
      id: 2,
      type: 'label_change',
      user: {
        name: 'Sarah Johnson',
        avatar: undefined,
      },
      timestamp: '2024-08-20T10:35:00Z',
      changes: {
        field: 'labels',
        oldValue: '',
        newValue: 'enhancement, backend',
      },
    },
    {
      id: 3,
      type: 'assignee_change',
      user: {
        name: 'Sarah Johnson',
        avatar: undefined,
      },
      timestamp: '2024-08-21T09:15:00Z',
      changes: {
        field: 'assignee',
        oldValue: '',
        newValue: 'Lan Chen',
      },
    },
    {
      id: 4,
      type: 'comment',
      user: {
        name: 'Lan Chen',
        avatar: undefined,
      },
      timestamp: '2024-08-22T11:20:00Z',
      content: 'I\'ll start working on this. Planning to implement the email service integration first.',
    },
    {
      id: 5,
      type: 'status_change',
      user: {
        name: 'Lan Chen',
        avatar: undefined,
      },
      timestamp: '2024-08-22T11:21:00Z',
      changes: {
        field: 'status',
        oldValue: 'open',
        newValue: 'in_progress',
      },
    },
    {
      id: 6,
      type: 'label_change',
      user: {
        name: 'Lan Chen',
        avatar: undefined,
      },
      timestamp: '2024-08-23T15:30:00Z',
      changes: {
        field: 'labels',
        oldValue: 'enhancement, backend',
        newValue: 'enhancement, backend, high-priority',
      },
    },
    {
      id: 7,
      type: 'comment',
      user: {
        name: 'Sarah Johnson',
        avatar: undefined,
      },
      timestamp: '2024-08-27T14:25:00Z',
      content: 'Thanks for the update! Please make sure to add rate limiting to prevent abuse.',
    },
  ],
})

// 👉 處理更新工單
function handleUpdateTicket(updates: Partial<Ticket>) {
  Object.assign(ticket.value, updates)
  // 實際應呼叫 API 更新
}

// 👉 處理新增評論
function handleAddComment(comment: string) {
  const newComment: TimelineItem = {
    id: ticket.value.timeline.length + 1,
    type: 'comment',
    user: {
      name: 'Current User', // 實際應從當前用戶資料取得
      avatar: undefined,
    },
    timestamp: new Date().toISOString(),
    content: comment,
  }
  
  ticket.value.timeline.push(newComment)
  // 實際應呼叫 API 新增評論
}
</script>

<template>
  <VContainer
    fluid
    class="ticket-detail-page"
  >
    <!-- 工單標題區 -->
    <TicketDetailHeader
      :ticket="ticket"
      @update:status="(status) => handleUpdateTicket({ status })"
      data-activity="ticket-detail-header"
    />

    <VRow class="mt-4">
      <!-- 主要內容區 -->
      <VCol
        cols="12"
        lg="8"
      >
        <TicketDetailMainContent
          :ticket="ticket"
          @add-comment="handleAddComment"
          data-activity="ticket-detail-main-content"
        />
      </VCol>

      <!-- 側邊欄 -->
      <VCol
        cols="12"
        lg="4"
      >
        <TicketDetailSidebar
          :ticket="ticket"
          @update:assignee="(assignee) => handleUpdateTicket({ assignee })"
          @update:labels="(labels) => handleUpdateTicket({ labels })"
          @update:priority="(priority) => handleUpdateTicket({ priority })"
          @update:dueDate="(dueDate) => handleUpdateTicket({ dueDate })"
          @update:visibility="(visibility) => handleUpdateTicket({ visibility })"
          @update:watching="(isWatching) => handleUpdateTicket({ isWatching })"
          data-activity="ticket-detail-sidebar"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.ticket-detail-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>

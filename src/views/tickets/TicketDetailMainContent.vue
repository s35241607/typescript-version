<script lang="ts" setup>
import { ref } from 'vue'
import TicketDescription from './TicketDescription.vue'
import TicketTimeline from './TicketTimeline.vue'
import TicketCommentBox from './TicketCommentBox.vue'

// 👉 Props
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
  description: string
  timeline: TimelineItem[]
  reporter: {
    id: number
    name: string
    avatar?: string
    email: string
  }
}

interface Props {
  ticket: Ticket
}

defineProps<Props>()

// 👉 Emits
const emit = defineEmits<{
  'add-comment': [comment: string]
}>()

// 👉 處理新增評論
function handleAddComment(comment: string) {
  emit('add-comment', comment)
}
</script>

<template>
  <div class="ticket-main-content">
    <!-- 描述區塊 -->
    <TicketDescription
      :description="ticket.description"
      :reporter="ticket.reporter"
      class="mb-6"
      data-activity="ticket-description"
    />

    <!-- 評論輸入框 -->
    <TicketCommentBox
      class="mb-6"
      @add-comment="handleAddComment"
      data-activity="ticket-comment-box"
    />

    <!-- 時間軸 -->
    <TicketTimeline
      :timeline="ticket.timeline"
      data-activity="ticket-timeline"
    />
  </div>
</template>

<style lang="scss" scoped>
.ticket-main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>

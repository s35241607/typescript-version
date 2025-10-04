<script lang="ts" setup>
import { computed } from 'vue'

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

interface Props {
  timeline: TimelineItem[]
}

const props = defineProps<Props>()

// 👉 格式化時間
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return date.toLocaleDateString()
}

// 👉 取得時間軸項目圖示
function getTimelineIcon(type: TimelineItem['type']): string {
  const icons = {
    created: 'ri-checkbox-blank-circle-fill',
    comment: 'ri-chat-3-line',
    status_change: 'ri-checkbox-circle-line',
    assignee_change: 'ri-user-line',
    label_change: 'ri-price-tag-3-line',
  }
  
  return icons[type]
}

// 👉 取得時間軸項目顏色
function getTimelineColor(type: TimelineItem['type']): string {
  const colors = {
    created: 'success',
    comment: 'primary',
    status_change: 'info',
    assignee_change: 'warning',
    label_change: 'secondary',
  }
  
  return colors[type]
}

// 👉 取得變更描述
function getChangeDescription(item: TimelineItem): string {
  if (!item.changes) return ''
  
  const { field, oldValue, newValue } = item.changes
  
  if (field === 'status') {
    return `changed status from <strong>${oldValue || 'none'}</strong> to <strong>${newValue}</strong>`
  }
  
  if (field === 'assignee') {
    return `assigned to <strong>${newValue}</strong>`
  }
  
  if (field === 'labels') {
    if (!oldValue) {
      return `added labels: <strong>${newValue}</strong>`
    }
    return `changed labels from <strong>${oldValue}</strong> to <strong>${newValue}</strong>`
  }
  
  return `changed ${field}`
}
</script>

<template>
  <VCard data-activity="timeline-card">
    <VCardText>
      <h3 class="text-h6 mb-4">
        Activity Timeline
      </h3>

      <VTimeline
        align="start"
        side="end"
        truncate-line="both"
        density="compact"
      >
        <VTimelineItem
          v-for="item in timeline"
          :key="item.id"
          :dot-color="getTimelineColor(item.type)"
          size="small"
          :data-activity="`timeline-item-${item.type}-${item.id}`"
        >
          <template #icon>
            <VIcon
              :icon="getTimelineIcon(item.type)"
              size="16"
            />
          </template>

          <div class="timeline-content">
            <div class="d-flex align-center gap-2 mb-2">
              <VAvatar
                :color="item.user.avatar ? undefined : 'secondary'"
                size="24"
              >
                <VImg
                  v-if="item.user.avatar"
                  :src="item.user.avatar"
                  :alt="item.user.name"
                />
                <span
                  v-else
                  class="text-xs"
                >
                  {{ item.user.name.charAt(0).toUpperCase() }}
                </span>
              </VAvatar>
              <span class="font-weight-semibold">{{ item.user.name }}</span>
              <span class="text-body-2 text-medium-emphasis">
                {{ formatTimestamp(item.timestamp) }}
              </span>
            </div>

            <!-- 評論內容 -->
            <VCard
              v-if="item.type === 'comment' && item.content"
              variant="tonal"
              class="mt-2"
            >
              <VCardText class="text-body-2">
                {{ item.content }}
              </VCardText>
            </VCard>

            <!-- 變更描述 -->
            <div
              v-else-if="item.changes"
              class="text-body-2"
              v-html="getChangeDescription(item)"
            />

            <!-- 建立描述 -->
            <div
              v-else-if="item.type === 'created'"
              class="text-body-2"
            >
              created this ticket
            </div>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.timeline-content {
  padding-block-end: 1rem;

  :deep(strong) {
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
  }
}
</style>

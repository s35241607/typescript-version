<script lang="ts" setup>
import { ref } from 'vue'

// 👉 Props
interface TicketLabel {
  id: number
  name: string
  color: string
  description?: string
}

interface Assignee {
  id: number
  name: string
  avatar?: string
  email: string
}

interface Ticket {
  assignee: Assignee | null
  labels: TicketLabel[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  dueDate: string | null
  watchers: number
  isWatching: boolean
  visibility: 'public' | 'private' | 'team'
  createdAt: string
  updatedAt: string
}

interface Props {
  ticket: Ticket
}

defineProps<Props>()

// 👉 Emits
const emit = defineEmits<{
  'update:assignee': [assignee: Assignee | null]
  'update:labels': [labels: TicketLabel[]]
  'update:priority': [priority: Ticket['priority']]
  'update:dueDate': [dueDate: string | null]
  'update:visibility': [visibility: Ticket['visibility']]
  'update:watching': [isWatching: boolean]
}>()

// 👉 可選的受理人列表（實際應從 API 取得）
const availableAssignees = ref<Assignee[]>([
  { id: 1, name: 'Lan Chen', avatar: undefined, email: 'lan@example.com' },
  { id: 2, name: 'Sarah Johnson', avatar: undefined, email: 'sarah@example.com' },
  { id: 3, name: 'Mike Wang', avatar: undefined, email: 'mike@example.com' },
  { id: 4, name: 'Emily Davis', avatar: undefined, email: 'emily@example.com' },
])

// 👉 可選的標籤列表（實際應從 API 取得）
const availableLabels = ref<TicketLabel[]>([
  { id: 1, name: 'enhancement', color: '#56CA00', description: 'New feature or request' },
  { id: 2, name: 'bug', color: '#FF4C51', description: 'Something is not working' },
  { id: 3, name: 'documentation', color: '#16B1FF', description: 'Improvements to documentation' },
  { id: 4, name: 'high-priority', color: '#FF4C51', description: 'High priority issue' },
  { id: 5, name: 'backend', color: '#16B1FF', description: 'Backend related' },
  { id: 6, name: 'frontend', color: '#8C57FF', description: 'Frontend related' },
])

// 👉 優先級選項
const priorityOptions = [
  { value: 'low', text: 'Low', color: 'grey', icon: 'ri-arrow-down-line' },
  { value: 'medium', text: 'Medium', color: 'info', icon: 'ri-subtract-line' },
  { value: 'high', text: 'High', color: 'warning', icon: 'ri-arrow-up-line' },
  { value: 'critical', text: 'Critical', color: 'error', icon: 'ri-error-warning-line' },
]

// 👉 可見性選項
const visibilityOptions = [
  { value: 'public', text: 'Public', icon: 'ri-global-line', description: 'Everyone can see' },
  { value: 'private', text: 'Private', icon: 'ri-lock-line', description: 'Only you can see' },
  { value: 'team', text: 'Team', icon: 'ri-team-line', description: 'Team members can see' },
]

// 👉 處理受理人變更
function handleAssigneeChange(assignee: Assignee | null) {
  emit('update:assignee', assignee)
}

// 👉 處理標籤變更
function handleLabelToggle(label: TicketLabel) {
  // 實際應該傳遞更新後的標籤陣列
  emit('update:labels', [label])
}

// 👉 處理優先級變更
function handlePriorityChange(priority: Ticket['priority']) {
  emit('update:priority', priority)
}

// 👉 處理截止日期變更
function handleDueDateChange(dueDate: string | null) {
  emit('update:dueDate', dueDate)
}

// 👉 處理可見性變更
function handleVisibilityChange(visibility: Ticket['visibility']) {
  emit('update:visibility', visibility)
}

// 👉 處理關注狀態變更
function handleWatchingToggle() {
  emit('update:watching', !props.ticket.isWatching)
}

// 👉 格式化日期
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>

<template>
  <div class="ticket-sidebar">
    <!-- 受理人 -->
    <VCard
      class="mb-4"
      data-activity="assignee-card"
    >
      <VCardText>
        <div class="d-flex align-center justify-space-between mb-3">
          <h4 class="text-subtitle-1 font-weight-semibold">
            Assignee
          </h4>
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                icon
                variant="text"
                size="small"
                data-activity="assignee-menu-btn"
              >
                <VIcon icon="ri-settings-3-line" />
              </VBtn>
            </template>
            <VList data-activity="assignee-menu-list">
              <VListItem
                v-for="assignee in availableAssignees"
                :key="assignee.id"
                @click="handleAssigneeChange(assignee)"
                :data-activity="`assignee-option-${assignee.id}`"
              >
                <template #prepend>
                  <VAvatar
                    :color="assignee.avatar ? undefined : 'secondary'"
                    size="32"
                  >
                    <span class="text-xs">
                      {{ assignee.name.charAt(0).toUpperCase() }}
                    </span>
                  </VAvatar>
                </template>
                <VListItemTitle>{{ assignee.name }}</VListItemTitle>
                <VListItemSubtitle>{{ assignee.email }}</VListItemSubtitle>
              </VListItem>
              <VDivider />
              <VListItem
                @click="handleAssigneeChange(null)"
                data-activity="assignee-clear"
              >
                <template #prepend>
                  <VIcon icon="ri-close-line" />
                </template>
                <VListItemTitle>Clear assignee</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </div>

        <div
          v-if="ticket.assignee"
          class="d-flex align-center gap-3"
        >
          <VAvatar
            :color="ticket.assignee.avatar ? undefined : 'primary'"
            size="40"
          >
            <span class="text-sm">
              {{ ticket.assignee.name.charAt(0).toUpperCase() }}
            </span>
          </VAvatar>
          <div>
            <div class="font-weight-semibold">
              {{ ticket.assignee.name }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              {{ ticket.assignee.email }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-body-2 text-medium-emphasis"
        >
          No assignee
        </div>
      </VCardText>
    </VCard>

    <!-- 標籤 -->
    <VCard
      class="mb-4"
      data-activity="labels-card"
    >
      <VCardText>
        <div class="d-flex align-center justify-space-between mb-3">
          <h4 class="text-subtitle-1 font-weight-semibold">
            Labels
          </h4>
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                icon
                variant="text"
                size="small"
                data-activity="labels-menu-btn"
              >
                <VIcon icon="ri-settings-3-line" />
              </VBtn>
            </template>
            <VList data-activity="labels-menu-list">
              <VListItem
                v-for="label in availableLabels"
                :key="label.id"
                @click="handleLabelToggle(label)"
                :data-activity="`label-option-${label.id}`"
              >
                <template #prepend>
                  <div
                    class="label-color-dot"
                    :style="{ backgroundColor: label.color }"
                  />
                </template>
                <VListItemTitle>{{ label.name }}</VListItemTitle>
                <VListItemSubtitle v-if="label.description">
                  {{ label.description }}
                </VListItemSubtitle>
              </VListItem>
            </VList>
          </VMenu>
        </div>

        <div
          v-if="ticket.labels.length > 0"
          class="d-flex flex-wrap gap-2"
        >
          <VChip
            v-for="label in ticket.labels"
            :key="label.id"
            :color="label.color"
            size="small"
            :data-activity="`label-chip-${label.id}`"
          >
            {{ label.name }}
          </VChip>
        </div>
        <div
          v-else
          class="text-body-2 text-medium-emphasis"
        >
          No labels
        </div>
      </VCardText>
    </VCard>

    <!-- 優先級 -->
    <VCard
      class="mb-4"
      data-activity="priority-card"
    >
      <VCardText>
        <div class="d-flex align-center justify-space-between mb-3">
          <h4 class="text-subtitle-1 font-weight-semibold">
            Priority
          </h4>
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                icon
                variant="text"
                size="small"
                data-activity="priority-menu-btn"
              >
                <VIcon icon="ri-settings-3-line" />
              </VBtn>
            </template>
            <VList data-activity="priority-menu-list">
              <VListItem
                v-for="option in priorityOptions"
                :key="option.value"
                @click="handlePriorityChange(option.value as Ticket['priority'])"
                :data-activity="`priority-option-${option.value}`"
              >
                <template #prepend>
                  <VIcon
                    :icon="option.icon"
                    :color="option.color"
                  />
                </template>
                <VListItemTitle>{{ option.text }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </div>

        <VChip
          :color="priorityOptions.find(p => p.value === ticket.priority)?.color"
          size="small"
        >
          <VIcon
            :icon="priorityOptions.find(p => p.value === ticket.priority)?.icon"
            size="16"
            start
          />
          {{ priorityOptions.find(p => p.value === ticket.priority)?.text }}
        </VChip>
      </VCardText>
    </VCard>

    <!-- 截止日期 -->
    <VCard
      class="mb-4"
      data-activity="due-date-card"
    >
      <VCardText>
        <h4 class="text-subtitle-1 font-weight-semibold mb-3">
          Due Date
        </h4>
        <div v-if="ticket.dueDate">
          <div class="d-flex align-center gap-2">
            <VIcon
              icon="ri-calendar-line"
              size="20"
              color="warning"
            />
            <span>{{ formatDate(ticket.dueDate) }}</span>
          </div>
        </div>
        <div
          v-else
          class="text-body-2 text-medium-emphasis"
        >
          No due date
        </div>
      </VCardText>
    </VCard>

    <!-- 通知設定 -->
    <VCard
      class="mb-4"
      data-activity="notifications-card"
    >
      <VCardText>
        <h4 class="text-subtitle-1 font-weight-semibold mb-3">
          Notifications
        </h4>
        <VBtn
          :variant="ticket.isWatching ? 'flat' : 'outlined'"
          :color="ticket.isWatching ? 'primary' : 'secondary'"
          block
          @click="handleWatchingToggle"
          data-activity="watching-toggle-btn"
        >
          <VIcon
            :icon="ticket.isWatching ? 'ri-eye-line' : 'ri-eye-off-line'"
            start
          />
          {{ ticket.isWatching ? 'Watching' : 'Watch' }}
        </VBtn>
        <div class="text-caption text-medium-emphasis mt-2">
          {{ ticket.watchers }} {{ ticket.watchers === 1 ? 'person is' : 'people are' }} watching
        </div>
      </VCardText>
    </VCard>

    <!-- 可見性設定 -->
    <VCard
      class="mb-4"
      data-activity="visibility-card"
    >
      <VCardText>
        <div class="d-flex align-center justify-space-between mb-3">
          <h4 class="text-subtitle-1 font-weight-semibold">
            Visibility
          </h4>
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                icon
                variant="text"
                size="small"
                data-activity="visibility-menu-btn"
              >
                <VIcon icon="ri-settings-3-line" />
              </VBtn>
            </template>
            <VList data-activity="visibility-menu-list">
              <VListItem
                v-for="option in visibilityOptions"
                :key="option.value"
                @click="handleVisibilityChange(option.value as Ticket['visibility'])"
                :data-activity="`visibility-option-${option.value}`"
              >
                <template #prepend>
                  <VIcon :icon="option.icon" />
                </template>
                <VListItemTitle>{{ option.text }}</VListItemTitle>
                <VListItemSubtitle>{{ option.description }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VMenu>
        </div>

        <VChip
          size="small"
          variant="tonal"
        >
          <VIcon
            :icon="visibilityOptions.find(v => v.value === ticket.visibility)?.icon"
            size="16"
            start
          />
          {{ visibilityOptions.find(v => v.value === ticket.visibility)?.text }}
        </VChip>
      </VCardText>
    </VCard>

    <!-- 詳細資訊 -->
    <VCard data-activity="details-card">
      <VCardText>
        <h4 class="text-subtitle-1 font-weight-semibold mb-3">
          Details
        </h4>
        <div class="details-list">
          <div class="detail-item">
            <span class="detail-label">Created</span>
            <span class="detail-value">{{ formatDate(ticket.createdAt) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Updated</span>
            <span class="detail-value">{{ formatDate(ticket.updatedAt) }}</span>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.ticket-sidebar {
  display: flex;
  flex-direction: column;
}

.label-color-dot {
  inline-size: 12px;
  block-size: 12px;
  border-radius: 50%;
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.6;
  font-size: 0.875rem;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>

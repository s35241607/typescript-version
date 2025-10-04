<script lang="ts" setup>
import { computed } from 'vue'

// 👉 Props
interface Ticket {
  id: number
  reference: string
  title: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
}

interface Props {
  ticket: Ticket
}

const props = defineProps<Props>()

// 👉 Emits
const emit = defineEmits<{
  'update:status': [status: Ticket['status']]
}>()

// 👉 狀態相關
const statusConfig = {
  open: { color: 'success', icon: 'ri-checkbox-blank-circle-line', text: 'Open' },
  in_progress: { color: 'info', icon: 'ri-loader-4-line', text: 'In Progress' },
  resolved: { color: 'warning', icon: 'ri-check-line', text: 'Resolved' },
  closed: { color: 'secondary', icon: 'ri-close-circle-line', text: 'Closed' },
}

const currentStatus = computed(() => statusConfig[props.ticket.status])

// 👉 優先級相關
const priorityConfig = {
  low: { color: 'grey', icon: 'ri-arrow-down-line', text: 'Low' },
  medium: { color: 'info', icon: 'ri-subtract-line', text: 'Medium' },
  high: { color: 'warning', icon: 'ri-arrow-up-line', text: 'High' },
  critical: { color: 'error', icon: 'ri-error-warning-line', text: 'Critical' },
}

const currentPriority = computed(() => priorityConfig[props.ticket.priority])

// 👉 處理狀態變更
function handleStatusChange(status: Ticket['status']) {
  emit('update:status', status)
}
</script>

<template>
  <VCard data-activity="ticket-header-card">
    <VCardText>
      <!-- 工單編號和狀態 -->
      <div class="d-flex align-center justify-space-between flex-wrap gap-4 mb-4">
        <div class="d-flex align-center gap-2">
          <VChip
            :color="currentStatus.color"
            size="small"
            data-activity="ticket-status-chip"
          >
            <VIcon
              :icon="currentStatus.icon"
              size="16"
              start
            />
            {{ currentStatus.text }}
          </VChip>
          
          <VChip
            :color="currentPriority.color"
            size="small"
            variant="outlined"
            data-activity="ticket-priority-chip"
          >
            <VIcon
              :icon="currentPriority.icon"
              size="16"
              start
            />
            {{ currentPriority.text }}
          </VChip>
        </div>

        <div class="d-flex align-center gap-2">
          <!-- 狀態變更選單 -->
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                variant="outlined"
                color="secondary"
                size="small"
                data-activity="ticket-status-menu-btn"
              >
                Change Status
                <VIcon
                  icon="ri-arrow-down-s-line"
                  end
                />
              </VBtn>
            </template>

            <VList data-activity="ticket-status-menu-list">
              <VListItem
                v-for="(config, status) in statusConfig"
                :key="status"
                :value="status"
                @click="handleStatusChange(status as Ticket['status'])"
                :data-activity="`ticket-status-option-${status}`"
              >
                <template #prepend>
                  <VIcon
                    :icon="config.icon"
                    :color="config.color"
                  />
                </template>
                <VListItemTitle>{{ config.text }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>

          <!-- 更多操作選單 -->
          <VMenu>
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                icon
                variant="text"
                size="small"
                data-activity="ticket-more-actions-btn"
              >
                <VIcon icon="ri-more-2-fill" />
              </VBtn>
            </template>

            <VList data-activity="ticket-more-actions-list">
              <VListItem
                value="edit"
                data-activity="ticket-edit-action"
              >
                <template #prepend>
                  <VIcon icon="ri-edit-line" />
                </template>
                <VListItemTitle>Edit</VListItemTitle>
              </VListItem>
              <VListItem
                value="copy-link"
                data-activity="ticket-copy-link-action"
              >
                <template #prepend>
                  <VIcon icon="ri-link" />
                </template>
                <VListItemTitle>Copy Link</VListItemTitle>
              </VListItem>
              <VListItem
                value="delete"
                data-activity="ticket-delete-action"
              >
                <template #prepend>
                  <VIcon
                    icon="ri-delete-bin-line"
                    color="error"
                  />
                </template>
                <VListItemTitle class="text-error">
                  Delete
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </div>
      </div>

      <!-- 工單標題 -->
      <div class="d-flex align-start gap-3">
        <VIcon
          icon="ri-file-text-line"
          size="24"
          color="primary"
        />
        <div class="flex-grow-1">
          <h1 class="text-h4 font-weight-bold mb-1">
            {{ ticket.title }}
          </h1>
          <div class="text-body-2 text-medium-emphasis">
            {{ ticket.reference }} opened on {{ new Date(ticket.createdAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.text-error {
  color: rgb(var(--v-theme-error));
}
</style>

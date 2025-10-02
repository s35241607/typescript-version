<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/date'

// 👉 路由實例
const router = useRouter()

interface TicketLabel {
  text: string
  color: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary'
}

interface TicketSummary {
  id: number
  reference: string
  title: string
  description: string
  project: string
  assignee: string
  icon: string
  updatedAt: string
  comments: number
  labels: TicketLabel[]
}

// 👉 搜尋輸入欄位
const searchTerm = ref('')

// 👉 工單範例資料
const tickets = ref<TicketSummary[]>([
  {
    id: 6,
    reference: 'lan9731016/lan_group/gitlab-ci-test#6',
    title: 'Enable email registration',
    description: 'Allow new members to sign up with email verification.',
    project: 'Authentication',
    assignee: 'Lan',
    icon: 'ri-mail-add-line',
    updatedAt: '2024-08-27T00:00:00Z',
    comments: 2,
    labels: [
      { text: 'confirmed', color: 'primary' },
      { text: 'critical', color: 'error' },
      { text: 'enhancement :D', color: 'success' },
      { text: 'suggestion', color: 'info' },
    ],
  },
  {
    id: 5,
    reference: 'lan9731016/lan_group/gitlab-ci-test#5',
    title: 'Implement user login flow',
    description: 'Create the full login experience with password reset.',
    project: 'Authentication',
    assignee: 'Lan',
    icon: 'ri-login-circle-line',
    updatedAt: '2024-08-27T00:00:00Z',
    comments: 8,
    labels: [
      { text: 'in progress', color: 'warning' },
      { text: 'backend', color: 'secondary' },
      { text: 'suggestion', color: 'info' },
    ],
  },
  {
    id: 4,
    reference: 'lan9731016/lan_group/gitlab-ci-test#4',
    title: 'Dashboard performance review',
    description: 'Investigate the loading time of analytics widgets.',
    project: 'Reporting',
    assignee: 'Sky',
    icon: 'ri-dashboard-line',
    updatedAt: '2024-08-18T00:00:00Z',
    comments: 5,
    labels: [
      { text: 'performance', color: 'warning' },
      { text: 'enhancement', color: 'success' },
    ],
  },
  {
    id: 3,
    reference: 'lan9731016/lan_group/gitlab-ci-test#3',
    title: 'Update brand illustration',
    description: 'Refresh hero image to align with new marketing campaign.',
    project: 'Design system',
    assignee: 'Mia',
    icon: 'ri-brush-line',
    updatedAt: '2024-08-10T00:00:00Z',
    comments: 1,
    labels: [
      { text: 'design', color: 'secondary' },
      { text: 'low priority', color: 'primary' },
    ],
  },
])

// 👉 篩選後的工單清單
const filteredTickets = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  if (!term)
    return tickets.value

  return tickets.value.filter(ticket => {
    const haystack = [
      ticket.title,
      ticket.reference,
      ticket.description,
      ticket.project,
      ticket.assignee,
      ticket.labels.map(label => label.text).join(' '),
    ].join(' ').toLowerCase()

    return haystack.includes(term)
  })
})

// 👉 是否無符合條件的工單
const hasNoResult = computed(() => filteredTickets.value.length === 0)

// 👉 導向工單詳細頁面
function navigateToTicket(ticketId: number) {
  router.push(`/tickets/${ticketId}`)
}

// 👉 導向新工單建立頁面
function createTicket() {
  router.push('/tickets/create')
}
</script>

<template>
  <VContainer class="pa-0">
    <VCard class="ticket-board">
      <VCardText class="pa-6">
        <div class="d-flex flex-wrap align-center gap-4 mb-6">
          <div class="flex-grow-1">
            <VTextField
              v-model="searchTerm"
              variant="outlined"
              placeholder="Search tickets"
              prepend-inner-icon="ri-search-line"
              density="comfortable"
              hide-details
              data-activity="tickets-search-field"
            />
          </div>

          <VBtn
            color="primary"
            variant="flat"
            prepend-icon="ri-add-line"
            class="text-none"
            data-activity="tickets-create-button"
            @click="createTicket"
          >
            New ticket
          </VBtn>
        </div>

        <div class="d-flex flex-wrap align-center justify-space-between mb-4 gap-2">
          <span class="text-subtitle-2 text-medium-emphasis">
            Showing {{ filteredTickets.length }} of {{ tickets.length }} tickets
          </span>
        </div>

        <div
          v-if="!hasNoResult"
          class="d-flex flex-column gap-4"
        >
          <VCard
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="ticket-card"
            variant="outlined"
          >
            <VCardText class="d-flex flex-wrap align-start justify-space-between gap-6">
              <div class="ticket-card__content">
                <div class="d-flex align-start gap-4 mb-4">
                  <VAvatar
                    color="primary"
                    size="44"
                    variant="tonal"
                    class="ticket-card__avatar"
                  >
                    <VIcon :icon="ticket.icon" />
                  </VAvatar>

                  <div class="ticket-card__headline">
                    <div class="d-flex flex-wrap align-center gap-2 mb-1">
                      <span class="text-subtitle-1 font-weight-medium">
                        {{ ticket.title }}
                      </span>

                      <VChip
                        size="small"
                        color="primary"
                        variant="tonal"
                        class="text-caption"
                      >
                        {{ ticket.reference }}
                      </VChip>
                    </div>

                    <p class="text-body-2 text-medium-emphasis mb-0">
                      {{ ticket.description }}
                    </p>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      {{ ticket.project }} · Assigned to {{ ticket.assignee }}
                    </div>
                  </div>
                </div>

                <div class="d-flex flex-wrap align-center gap-2">
                  <VChip
                    v-for="label in ticket.labels"
                    :key="label.text"
                    :color="label.color"
                    variant="tonal"
                    size="small"
                    class="ticket-card__label text-caption"
                  >
                    {{ label.text }}
                  </VChip>
                </div>
              </div>

              <div class="ticket-card__aside d-flex flex-column align-end gap-3">
                <div class="text-body-2 text-medium-emphasis">
                  Updated on {{ formatDate(ticket.updatedAt, 'yyyy-MM-dd') }}
                </div>

                <VChip
                  color="secondary"
                  variant="outlined"
                  size="small"
                  prepend-icon="ri-chat-3-line"
                  class="text-caption"
                >
                  {{ ticket.comments }} comments
                </VChip>

                <VBtn
                  color="primary"
                  variant="text"
                  append-icon="ri-arrow-right-line"
                  class="text-none"
                  data-activity="tickets-view-details"
                  @click="navigateToTicket(ticket.id)"
                >
                  View details
                </VBtn>
              </div>
            </VCardText>
          </VCard>
        </div>

        <VAlert
          v-else
          border="start"
          color="info"
          variant="tonal"
          icon="ri-search-eye-line"
        >
          No tickets match your search.
        </VAlert>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped>
.ticket-board {
  border-radius: 16px;
  box-shadow: var(--v-shadow-2);
}

.ticket-card {
  border-radius: 16px;
}

.ticket-card__avatar {
  box-shadow: none;
}

.ticket-card__label {
  text-transform: capitalize;
}

.ticket-card__aside {
  min-inline-size: 180px;
}
</style>

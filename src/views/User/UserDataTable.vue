<script setup lang="ts">
import type { UserResponse } from '@/api/services/userType'
import { useUserStore } from '@/stores/useUserStore'
import avatar1 from '@images/avatars/avatar-1.png'

defineProps({
  users: Array<UserResponse>,
})

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'User', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Login Failed Attempts', key: 'loginFailedAttempts' },
  { title: 'Last Login Date', key: 'LastLoginDate' },
  { title: 'Role', key: 'roles' },
])

const userStore = useUserStore()
const apiGatewayUrl: string = import.meta.env.VITE_API_GATEWAY_URL

onMounted(async () => {
  await userStore.fetch()
})
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="userStore.users"
  >
    <template #item.id="{ item }">
      <RouterLink
        :to="`/users/${item.username}`"
        class="text-blue text-decoration-none"
      >
        #{{ item.id }}
      </Routerlink>
    </template>
    <template #item.username="{ item }">
      <div class="d-flex align-center">
        <!-- 使用 VAvatar 顯示頭像 -->
        <VAvatar
          size="34"
          class="me-3"
        >
          <VImg :src="`${apiGatewayUrl}/api/v1/users/${item.id}/image`">
            <template #error>
              <VImg :src="avatar1" />
            </template>
          </VImg>
        </VAvatar>

        <!-- 使用者資訊 -->
        <div class="d-flex flex-column">
          <RouterLink
            :to="`/users/${item.username}`"
            class="text-h6 font-weight-medium user-list-name"
          >
            {{ item.username }}
          </RouterLink>
          <span class="text-sm text-medium-emphasis">{{ item.email }}</span>
        </div>
      </div>
    </template>
  </VDataTable>
</template>

<style scope>
.v-data-table thead th,
.v-data-table tbody td {
  white-space: nowrap;
}
</style>

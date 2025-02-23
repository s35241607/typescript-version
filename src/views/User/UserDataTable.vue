<script setup lang="ts">
import type { UserResponse } from '@/api/services/userType'
import { useUserStore } from '@/stores/useUserStore'

defineProps({
  users: Array<UserResponse>,
})

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Login Failed Attempts', key: 'loginFailedAttempts' },
  { title: 'Last Login Date', key: 'LastLoginDate' },
  { title: 'Role', key: 'roles' },
])

const userStore = useUserStore()

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
        :to="`/users/${item.id}`"
        class="text-blue text-decoration-none"
      >
        #{{ item.id }}
      </Routerlink>
    </template>
    <template #item.username="{ item }">
      {{ item.username }}
    </template>
  </VDataTable>
</template>

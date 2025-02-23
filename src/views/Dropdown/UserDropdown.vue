<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userService from '@/api/services/userService'
import type { UserResponse } from '@/api/services/userType'
import { useApi } from '@/composables/useApi'

const search = ref<string>('')
const { data: users, loading: usersLoading, fetch: fetchUsers } = useApi<UserResponse>()

const apiGatewayUrl = import.meta.env.VITE_API_GATEWAY_URL

onMounted(async () => {
  await fetchUsers(userService.getUsers())
})
</script>

<template>
  <VAutocomplete
    v-model="search"
    :items="users"
    :loading="usersLoading"
    item-value="id"
    item-title="username"
    label="Search"
  >
    <template #item="{ props, item }">
      <VListItem
        v-bind="props"
        :prepend-avatar="`${apiGatewayUrl}/api/v1/users/${item.value}/image`"
        :title="item.raw.username"
        :subtitle="item.raw.email"
      />
    </template>
  </VAutocomplete>
</template>

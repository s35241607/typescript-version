<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userService from '@/api/services/userService'
import type { UserResponse } from '@/api/services/userType'
import { useApi } from '@/composables/useApi'
import avatar1 from '@images/avatars/avatar-1.png'

const search = ref<string>('')
const { data: users, loading: usersLoading, fetch: fetchUsers } = useApi<UserResponse>()

const apiGatewayUrl: string = import.meta.env.VITE_API_GATEWAY_URL

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
        :title="item.raw.username"
        :subtitle="item.raw.email"
      >
        <template #prepend>
          <VAvatar>
            <VImg :src="`${apiGatewayUrl}/api/v1/users/${item.value}/image`">
              <template #error>
                <VImg :src="avatar1" />
              </template>
            </VImg>
          </VAvatar>
        </template>
      </VListItem>
    </template>
  </VAutocomplete>
</template>

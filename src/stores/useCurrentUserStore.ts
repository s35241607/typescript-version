import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/api/services/userService'
import type { UserResponse } from '@/api/services/userType'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const user = ref<UserResponse | null>(null)
  const loading = ref<boolean>(false)
  const message = ref<string>()

  async function fetch() {
    try {
      loading.value = true
      user.value = await userService.getCurrentUser()
    }
    catch (err: any) {
      console.error('Failed to fetch user:', err)
      message.value = err?.response?.data?.message || 'Failed to fetch user data.'
    }
    finally {
      loading.value = false
    }
  }

  return { user, loading, message, fetch }
})

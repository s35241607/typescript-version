import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/api/services/userService'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserResponse | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchUser() {
    try {
      user.value = await userService.getCurrentUser()
      error.value = null
    }
    catch (err) {
      console.error('Failed to fetch user:', err)
      error.value = 'Failed to fetch user data.'
    }
  }

  return { user, loading, fetchUser, error }
})

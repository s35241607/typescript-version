import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/api/services/userService'
import type { User } from '@/api/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
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

  return { user, fetchUser, error }
})

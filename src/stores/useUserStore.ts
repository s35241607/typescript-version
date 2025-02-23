import { useSnakeBarStore } from './useSnakeBarStore'
import userService from '@/api/services/userService'
import type { UserResponse } from '@/api/services/userType'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserResponse[]>()
  const loading = ref<boolean>(false)
  const message = ref<string | null>()

  const snakeBarStore = useSnakeBarStore()

  async function fetch() {
    try {
      loading.value = true
      users.value = await userService.getUsers()
    }
    catch (err: any) {
      console.error(err)

      snakeBarStore.show(err?.response?.data?.message || 'fetch user error.')
    }
    finally {
      loading.value = false
    }
  }

  return { users, loading, message, fetch }
})

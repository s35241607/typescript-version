import { useSnackbarStore } from './useSnackbarStore'
import userService from '@/api/services/userService'
import type { UserResponse } from '@/api/services/userType'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserResponse[]>()
  const loading = ref<boolean>(false)
  const message = ref<string | null>()

  const snackbarStore = useSnackbarStore()

  async function fetch() {
    try {
      loading.value = true
      users.value = await userService.getUsers()
    }
    catch (err: any) {
      console.error(err)

      snackbarStore.show(err?.response?.data?.message || 'fetch user error.')
    }
    finally {
      loading.value = false
    }
  }

  // 轉換成 Map 以加速查找
  const usersMap = computed<Record<number, UserResponse>>(() => {
    if (!users.value)
      return {}

    return users.value.reduce((map, user) => {
      map[user.id] = user

      return map
    }, {} as Record<number, UserResponse>)
  })

  return { users, loading, message, fetch, usersMap }
})

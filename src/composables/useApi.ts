import { ref } from 'vue'
import { useSnakeBarStore } from '@/stores/useSnakeBarStore'

export function useApi<T>() {
  const data = ref<T[]>()
  const loading = ref<boolean>(false)

  const snakeBarStore = useSnakeBarStore()

  async function fetch(api: Promise<T[]>, transform: any = null) {
    try {
      loading.value = true

      const response: T[] = await api

      // 如果有 transform 函數則進行轉換，否則直接使用原始數據
      data.value = transform ? response.map(transform) as T[] : response
    }
    catch (err: any) {
      console.error(err)
      snakeBarStore.show(err?.response?.data?.message || err?.message)
    }
    finally {
      loading.value = false
    }
  }

  return { data, loading, fetch }
}

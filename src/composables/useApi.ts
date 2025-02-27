import { ref } from 'vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

export function useApi<T>() {
  const data = ref<T[]>()
  const loading = ref<boolean>(false)

  const snackbarStore = useSnackbarStore()

  async function fetch(api: Promise<T[]>, transform: any = null) {
    try {
      loading.value = true

      const response: T[] = await api

      // 如果有 transform 函數則進行轉換，否則直接使用原始數據
      data.value = transform ? response.map(transform) as T[] : response
    }
    catch (err: any) {
      console.error(err)
      snackbarStore.show(err?.response?.data?.message || err?.message)
    }
    finally {
      loading.value = false
    }
  }

  return { data, loading, fetch }
}

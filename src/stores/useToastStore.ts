import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const queue = ref<any>([]) // 存放多個訊息的佇列
  const timeout = 3000 // Toast 顯示時間

  const show = (msg: string, type = 'success') => {
    queue.value.push({ message: msg, color: type })

    // 自動移除最前面的 Toast
    setTimeout(() => {
      queue.value.shift()
    }, timeout)
  }

  return { queue, show }
})

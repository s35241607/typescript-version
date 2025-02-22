import { ref } from 'vue'

export const useSnakeBarStore = defineStore('snakeBar', () => {
  const message = ref<string | null>(null)
  const snakeBarColor = ref<string | undefined>()
  const isVisible = ref<boolean>(false)

  const showSnackbar = (msg: string, color: string = 'error') => {
    message.value = msg
    snakeBarColor.value = color
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
      message.value = null
    }, 3000) // Snackbar will be visible for 3 seconds
  }

  return {
    message,
    snakeBarColor,
    isVisible,
    showSnackbar,
  }
})

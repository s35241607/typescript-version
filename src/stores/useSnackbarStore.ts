import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref<string | null>(null)
  const color = ref<string | undefined>()
  const isVisible = ref<boolean>(false)

  const show = (msg: string, colorType: string = 'error') => {
    message.value = msg
    color.value = colorType
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
      message.value = null
    }, 3000)
  }

  return {
    message,
    color,
    isVisible,
    show,
  }
})

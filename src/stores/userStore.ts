import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  async function fetchUser() {
    try {
      console.log(123)
    }
    catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  return { user }
})

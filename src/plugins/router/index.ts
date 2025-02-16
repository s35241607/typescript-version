import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useLoadingStore } from '@/stores/loaingStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default function (app: App) {
  app.use(router)

  // 在這裡設置路由守衛
  const loadingStore = useLoadingStore()

  router.beforeEach((to, from, next) => {
    loadingStore.setLoading(true) // 開始路由切換時顯示進度條
    next()
  })

  router.afterEach(() => {
    loadingStore.setLoading(false) // 路由切換完成後隱藏進度條
  })
}

export { router }

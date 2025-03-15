<script setup lang="ts">
import { router } from '@/plugins/router'

// 獲取當前路由
const route = useRoute()

const breadcrumbs = computed(() => {
  const allRoutes = router.getRoutes()
  const lastRoute = route.matched.at(-1)
  const allPath = lastRoute?.path.split('/').splice(1)

  console.log('allRoutes', allRoutes)
  console.log('lastRoute', lastRoute)
  console.log('allPath', allPath)
  if (!allPath || lastRoute?.path === '/home')
    return [{ title: 'Home', to: '/' }]

  return allPath.map((pathSegment: string, index: number) => {
    const to = `/${allPath.slice(0, index + 1).join('/')}`

    console.log('to', to)
    let title: string = allRoutes.find(f => f.path === to)?.meta.breadcrumb as string

    if (title?.startsWith(':'))
      title = route.params[title.slice(1)] as string

    // if (!to)
    //   to = '/'

    // if (!title)
    //   title = 'Home'

    return {
      title,
      to,
    }
  })
})
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs" />
</template>

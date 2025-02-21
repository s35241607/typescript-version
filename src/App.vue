<script setup lang="ts">
import { useLoadingStore } from '@/stores/useLoadingStore'

const loadingStore = useLoadingStore()
</script>

<template>
  <VApp>
    <VProgressLinear
      v-if="loadingStore.loading"
      indeterminate
      absolute
      color="primary"
      height="3"
      style="z-index: 9999;"
    />
    <RouterView />
  </VApp>
</template>
@/stores/useLoadingStore

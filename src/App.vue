<script setup lang="ts">
import { useSnakeBarStore } from './stores/useSnakeBarStore'
import { useLoadingStore } from '@/stores/useLoadingStore'

const loadingStore = useLoadingStore()
const snakeBarStore = useSnakeBarStore()
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
    <VSnackbar
      v-model="snakeBarStore.isVisible"
      :color="snakeBarStore.color"
      location="bottom right"
      variant="tonal"
    >
      {{ snakeBarStore.message }}
      <template #actions>
        <VBtn
          color="white"
          icon="ri-close-line"
          @click="snakeBarStore.isVisible = false"
        />
      </template>
    </VSnackbar>
    <RouterView />
  </VApp>
</template>

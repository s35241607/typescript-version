<script setup lang="ts">
import { useSnakeBarStore } from './stores/useSnakeBarStore'
import { useToastStore } from './stores/useToastStore'
import { useLoadingStore } from '@/stores/useLoadingStore'

const loadingStore = useLoadingStore()
const snakeBarStore = useSnakeBarStore()
const { queue } = useToastStore()
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

    <!-- Toast 訊息區 -->
    <div class="toast-container">
      <VAlert
        v-for="item in queue"
        :key="item.id"
        :type="item.color"
        class="toast"
      >
        {{ item.message }}
      </VAlert>
    </div>
    <RouterView />
  </VApp>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.toast {
  margin-bottom: 10px;
  width: 300px;
}
</style>
./stores/useToastStore

<script setup lang="ts">
import { useSnackbarStore } from './stores/useSnackbarStore'
import { useToastStore } from './stores/useToastStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import VersionUpdateNotification from '@/components/VersionUpdateNotification.vue'

const loadingStore = useLoadingStore()
const snackbarStore = useSnackbarStore()
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
      v-model="snackbarStore.isVisible"
      :color="snackbarStore.color"
      location="bottom right"
      variant="tonal"
    >
      {{ snackbarStore.message }}
      <template #actions>
        <VBtn
          color="white"
          icon="ri-close-line"
          @click="snackbarStore.isVisible = false"
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
        variant="tonal"
        closable
      >
        {{ item.message }}
      </VAlert>
    </div>

    <!-- 新版本通知 -->
    <VersionUpdateNotification />

    <RouterView />
  </VApp>
</template>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  inset-block-start: 20px;
  inset-inline-end: 20px;
}

.toast {
  inline-size: 300px;
  margin-block-end: 10px;
}
</style>

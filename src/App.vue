<script setup lang="ts">
import { useLoadingStore } from '@/stores/loaingStore'

const loadingStore = useLoadingStore()
</script>

<template>
  <v-app>
    <v-progress-linear
      v-if="loadingStore.loading"
      indeterminate
      color="primary"
      height="4"
    ></v-progress-linear>
    <router-view />
  </v-app>
</template>

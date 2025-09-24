<script setup lang="ts">
import { ref } from 'vue'
import TagSelector from '@/components/ui/TagSelector.vue'

const initialItems = [
  { id: 'discussion', label: 'discussion', color: '#4a90e2' },
  { id: 'documentation', label: 'documentation', color: '#f5a623' },
  { id: 'enhancement', label: 'enhancement', color: '#7ed321' },
]

const selected = ref<string[]>([])
</script>

<template>
  <div class="pa-6">
    <h2>TagSelector Demo</h2>
    <p>這個頁面展示 `TagSelector` 組件的用法與互動。</p>

    <TagSelector
      v-model="selected"
      :initial="initialItems"
    />

    <div class="mt-6">
      <h3>Selected</h3>
      <pre>{{ selected }}</pre>
    </div>
  </div>
</template>

<style scoped>
.pa-6 { padding: 24px; }
.mt-6 { margin-block-start: 24px; }
</style>

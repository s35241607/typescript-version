<script lang="ts" setup>
import { ref } from 'vue'
import LabelSelector from '@/components/ui/LabelSelector.vue'

// 標籤介面
interface Label {
  id: string
  name: string
  color: string
}

// 示例數據
const selectedLabels = ref<Label[]>([
  { id: '1', name: 'confirmed', color: '#f44336' },
  { id: '2', name: 'critical', color: '#ff5722' },
  { id: '3', name: 'enhancement :D', color: '#4caf50' },
])

const availableLabels = ref<Label[]>([
  { id: '1', name: 'confirmed', color: '#f44336' },
  { id: '2', name: 'critical', color: '#ff5722' },
  { id: '3', name: 'enhancement :D', color: '#4caf50' },
  { id: '4', name: 'bug', color: '#e91e63' },
  { id: '5', name: 'documentation', color: '#2196f3' },
])

// 處理創建新標籤
function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  // 生成唯一 ID
  const id = Date.now().toString()

  // 添加到可用標籤列表
  const label: Label = {
    id,
    ...newLabel,
  }

  availableLabels.value.push(label)

  // 顯示成功訊息
  console.log('Label created:', label)

  // 可以在這裡加入 API 調用
}

// 處理管理標籤
function handleManageLabels() {
  console.log('Manage labels clicked')

  // 可以導航到管理頁面
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Label Selector Demo</VCardTitle>
          <VCardText>
            <div class="mb-4">
              <h3 class="text-h6 mb-2">
                Basic Usage
              </h3>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Click the button below to open the label selector dropdown. You can search, select, and create new labels.
              </p>

              <LabelSelector
                v-model="selectedLabels"
                :available-labels="availableLabels"
                @create="handleCreateLabel"
                @manage="handleManageLabels"
              />
            </div>

            <VDivider class="my-6" />

            <div>
              <h3 class="text-h6 mb-2">
                Selected Labels
              </h3>
              <div class="d-flex flex-wrap gap-2">
                <VChip
                  v-for="label in selectedLabels"
                  :key="label.id"
                  :color="label.color"
                  label
                >
                  {{ label.name }}
                </VChip>
                <VChip
                  v-if="selectedLabels.length === 0"
                  variant="outlined"
                >
                  No labels selected
                </VChip>
              </div>
            </div>

            <VDivider class="my-6" />

            <div>
              <h3 class="text-h6 mb-2">
                Component Data
              </h3>
              <pre class="text-caption bg-surface-variant pa-4 rounded"><code>{{ JSON.stringify({ selectedLabels, availableLabels }, null, 2) }}</code></pre>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
pre {
  max-inline-size: 100%;
  overflow-x: auto;
}
</style>

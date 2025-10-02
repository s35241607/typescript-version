<script lang="ts" setup>
import { ref } from 'vue'
import AdvancedLabelSelector from '@/components/ui/AdvancedLabelSelector.vue'

// 標籤介面定義
interface Label {
  id: string
  name: string
  color: string
}

// 已選擇的標籤
const selectedLabels = ref<Label[]>([
  { id: '1', name: 'Bug', color: '#E91E63' },
  { id: '3', name: 'Enhancement', color: '#4CAF50' },
])

// 所有可用的標籤
const availableLabels = ref<Label[]>([
  { id: '1', name: 'Bug', color: '#E91E63' },
  { id: '2', name: 'Critical', color: '#F44336' },
  { id: '3', name: 'Enhancement', color: '#4CAF50' },
  { id: '4', name: 'Documentation', color: '#2196F3' },
  { id: '5', name: 'Question', color: '#9C27B0' },
  { id: '6', name: 'Wontfix', color: '#9E9E9E' },
  { id: '7', name: 'Help Wanted', color: '#FF9800' },
  { id: '8', name: 'Good First Issue', color: '#03A9F4' },
])

// 處理新增標籤事件
function handleCreateLabel(newLabel: Omit<Label, 'id'>) {
  // 生成唯一 ID
  const id = `label-${Date.now()}`

  // 建立完整的標籤物件
  const label: Label = {
    id,
    ...newLabel,
  }

  // 添加到可用標籤列表
  availableLabels.value.push(label)

  // 顯示成功訊息
  console.log('Label created successfully:', label)

  // 這裡可以呼叫 API 將標籤儲存到後端
  // await createLabelAPI(label)
}

// 處理標籤管理事件
function handleGoManage() {
  console.log('Navigating to label management page...')
  console.log('This is a demo - would navigate to /label-management')

  // 這裡可以導航到標籤管理頁面
  // router.push('/label-management')
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center gap-2">
            <VIcon
              icon="ri-price-tag-3-line"
              color="primary"
            />
            Advanced Label Selector Demo
          </VCardTitle>

          <VCardText>
            <!-- 使用說明 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-2">
                Feature Overview
              </h3>
              <VList density="compact">
                <VListItem prepend-icon="ri-search-line">
                  <VListItemTitle>Real-time search filtering</VListItemTitle>
                </VListItem>
                <VListItem prepend-icon="ri-check-double-line">
                  <VListItemTitle>Multiple label selection</VListItemTitle>
                </VListItem>
                <VListItem prepend-icon="ri-add-circle-line">
                  <VListItemTitle>Create new labels with custom colors</VListItemTitle>
                </VListItem>
                <VListItem prepend-icon="ri-palette-line">
                  <VListItemTitle>12 predefined colors + color picker</VListItemTitle>
                </VListItem>
                <VListItem prepend-icon="ri-settings-3-line">
                  <VListItemTitle>Label management navigation</VListItemTitle>
                </VListItem>
              </VList>
            </div>

            <VDivider class="my-6" />

            <!-- 元件展示 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-3">
                Try It Out
              </h3>
              <p class="text-body-2 text-medium-emphasis mb-4">
                Click the button below to open the advanced label selector.
              </p>

              <AdvancedLabelSelector
                v-model="selectedLabels"
                :available-labels="availableLabels"
                @create-label="handleCreateLabel"
                @go-manage="handleGoManage"
              />
            </div>

            <VDivider class="my-6" />

            <!-- 已選擇的標籤展示 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-3">
                Selected Labels ({{ selectedLabels.length }})
              </h3>
              <div class="d-flex flex-wrap gap-2">
                <VChip
                  v-for="label in selectedLabels"
                  :key="label.id"
                  :color="label.color"
                  label
                  closable
                  @click:close="selectedLabels = selectedLabels.filter(l => l.id !== label.id)"
                >
                  {{ label.name }}
                </VChip>
                <VChip
                  v-if="selectedLabels.length === 0"
                  variant="outlined"
                  color="default"
                >
                  No labels selected
                </VChip>
              </div>
            </div>

            <VDivider class="my-6" />

            <!-- 所有可用標籤展示 -->
            <div class="mb-6">
              <h3 class="text-h6 mb-3">
                Available Labels ({{ availableLabels.length }})
              </h3>
              <div class="d-flex flex-wrap gap-2">
                <VChip
                  v-for="label in availableLabels"
                  :key="label.id"
                  :color="label.color"
                  label
                  variant="outlined"
                >
                  {{ label.name }}
                </VChip>
              </div>
            </div>

            <VDivider class="my-6" />

            <!-- 資料展示 -->
            <div>
              <h3 class="text-h6 mb-3">
                Component Data
              </h3>
              <VExpansionPanels>
                <VExpansionPanel
                  title="Selected Labels Data"
                  text=""
                >
                  <VExpansionPanelText>
                    <pre class="text-caption bg-surface-variant pa-4 rounded"><code>{{ JSON.stringify(selectedLabels, null, 2) }}</code></pre>
                  </VExpansionPanelText>
                </VExpansionPanel>

                <VExpansionPanel
                  title="Available Labels Data"
                  text=""
                >
                  <VExpansionPanelText>
                    <pre class="text-caption bg-surface-variant pa-4 rounded"><code>{{ JSON.stringify(availableLabels, null, 2) }}</code></pre>
                  </VExpansionPanelText>
                </VExpansionPanel>
              </VExpansionPanels>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 使用範例卡片 -->
    <VRow class="mt-4">
      <VCol cols="12">
        <VCard>
          <VCardTitle>Usage Example</VCardTitle>
          <VCardText>
            <pre
              class="text-caption bg-surface-variant pa-4 rounded"
              style="overflow-x: auto;"
            ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import AdvancedLabelSelector from '@/components/ui/AdvancedLabelSelector.vue'

const selectedLabels = ref([])
const availableLabels = ref([
  { id: '1', name: 'Bug', color: '#E91E63' },
  { id: '2', name: 'Feature', color: '#4CAF50' },
])

function handleCreateLabel(newLabel) {
  const label = {
    id: Date.now().toString(),
    ...newLabel,
  }
  availableLabels.value.push(label)
}

function handleGoManage() {
  // Navigate to management page
  router.push('/label-management')
}
&lt;/script&gt;

&lt;template&gt;
  &lt;AdvancedLabelSelector
    v-model="selectedLabels"
    :available-labels="availableLabels"
    @create-label="handleCreateLabel"
    @go-manage="handleGoManage"
  /&gt;
&lt;/template&gt;</code></pre>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- API 說明卡片 -->
    <VRow class="mt-4">
      <VCol cols="12">
        <VCard>
          <VCardTitle>Component API</VCardTitle>
          <VCardText>
            <VTable>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="3">
                    <strong>Props</strong>
                  </td>
                </tr>
                <tr>
                  <td><code>modelValue</code></td>
                  <td><code>Label[]</code></td>
                  <td>Currently selected labels (v-model support)</td>
                </tr>
                <tr>
                  <td><code>availableLabels</code></td>
                  <td><code>Label[]</code></td>
                  <td>All available labels for selection</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <strong>Events</strong>
                  </td>
                </tr>
                <tr>
                  <td><code>@update:modelValue</code></td>
                  <td><code>(value: Label[]) => void</code></td>
                  <td>Emitted when selected labels change</td>
                </tr>
                <tr>
                  <td><code>@create-label</code></td>
                  <td><code>(label: Omit&lt;Label, 'id'&gt;) => void</code></td>
                  <td>Emitted when creating a new label</td>
                </tr>
                <tr>
                  <td><code>@go-manage</code></td>
                  <td><code>() => void</code></td>
                  <td>Emitted when clicking "Label Management" button</td>
                </tr>
                <tr>
                  <td colspan="3">
                    <strong>Types</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <code>
                      interface Label {<br>
                      &nbsp;&nbsp;id: string<br>
                      &nbsp;&nbsp;name: string<br>
                      &nbsp;&nbsp;color: string // Hex color code<br>
                      }
                    </code>
                  </td>
                </tr>
              </tbody>
            </VTable>
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

code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}
</style>

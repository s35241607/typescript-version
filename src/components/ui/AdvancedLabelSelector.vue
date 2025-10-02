<script lang="ts" setup>
import { computed, ref } from 'vue'

// 標籤介面定義
interface Label {
  id: string
  name: string
  color: string
}

// Props 定義
const props = defineProps<{
  modelValue?: Label[]
  availableLabels?: Label[]
}>()

// Emits 定義
const emit = defineEmits<{
  'update:modelValue': [value: Label[]]
  'create-label': [label: Omit<Label, 'id'>]
  'go-manage': []
}>()

// 狀態管理
const isMenuOpen = ref(false)
const isCreatingLabel = ref(false)
const searchQuery = ref('')
const newLabelName = ref('')
const newLabelColor = ref('#6699cc')
const showColorPicker = ref(false)

// 預設顏色（前兩排：10~12 個固定色塊）
const predefinedColors = [
  '#e91e63', // Pink
  '#f44336', // Red
  '#ff5722', // Deep Orange
  '#ff9800', // Orange
  '#ffc107', // Amber
  '#ffeb3b', // Yellow
  '#4caf50', // Green
  '#009688', // Teal
  '#03a9f4', // Light Blue
  '#2196f3', // Blue
  '#3f51b5', // Indigo
  '#9c27b0', // Purple
]

// 計算屬性
const selectedLabels = computed(() => props.modelValue || [])
const availableLabels = computed(() => props.availableLabels || [])

// 根據搜尋過濾可用標籤
const filteredAvailableLabels = computed(() => {
  if (!searchQuery.value.trim())
    return availableLabels.value

  const query = searchQuery.value.toLowerCase()

  return availableLabels.value.filter(label =>
    label.name.toLowerCase().includes(query),
  )
})

// 未選擇的標籤（用於顯示在選擇區域）
const unselectedLabels = computed(() => {
  const selectedIds = new Set(selectedLabels.value.map(l => l.id))

  return filteredAvailableLabels.value.filter(label => !selectedIds.has(label.id))
})

// 切換標籤選擇狀態
function toggleLabel(label: Label) {
  const index = selectedLabels.value.findIndex(l => l.id === label.id)
  const newLabels = [...selectedLabels.value]

  if (index > -1)
    newLabels.splice(index, 1)
  else
    newLabels.push(label)

  emit('update:modelValue', newLabels)
}

// 清除所有已選標籤
function clearAllLabels() {
  emit('update:modelValue', [])
}

// 取消新增標籤
function cancelCreateLabel() {
  isCreatingLabel.value = false
  newLabelName.value = ''
  newLabelColor.value = '#6699cc'
  showColorPicker.value = false
}

// 確認新增標籤
function confirmCreateLabel() {
  if (!newLabelName.value.trim())
    return

  emit('create-label', {
    name: newLabelName.value.trim(),
    color: newLabelColor.value,
  })

  cancelCreateLabel()
}

// 處理管理標籤事件
function handleManageLabels() {
  emit('go-manage')
  isMenuOpen.value = false
}

// 選擇預設顏色
function selectPredefinedColor(color: string) {
  newLabelColor.value = color
}

// 驗證並格式化 hex 色碼
function validateHexColor(value: string) {
  // 移除空白
  value = value.trim()

  // 如果沒有 # 前綴，自動加上
  if (value && !value.startsWith('#'))
    value = `#${value}`

  // 驗證格式（#RGB 或 #RRGGBB）
  const hexRegex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

  if (hexRegex.test(value))
    newLabelColor.value = value.toUpperCase()
}
</script>

<template>
  <VMenu
    v-model="isMenuOpen"
    :close-on-content-click="false"
    location="bottom"
    max-width="420"
  >
    <!-- 觸發按鈕 -->
    <template #activator="{ props: activatorProps }">
      <VBtn
        v-bind="activatorProps"
        variant="outlined"
        color="default"
        data-activity="advanced-label-selector-trigger"
      >
        <span v-if="selectedLabels.length === 0">Select Labels</span>
        <span v-else>
          {{ selectedLabels[0].name }}
          <span v-if="selectedLabels.length > 1">
            +{{ selectedLabels.length - 1 }} More
          </span>
        </span>
        <VIcon end>
          {{ isMenuOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line' }}
        </VIcon>
      </VBtn>
    </template>

    <!-- 下拉選單內容 -->
    <VCard min-width="400">
      <!-- 主要畫面：搜尋與列表 -->
      <VCardText
        v-if="!isCreatingLabel"
        class="pa-0"
      >
        <!-- 標題列 -->
        <div class="px-4 pt-4 pb-2 d-flex justify-space-between align-center">
          <span class="text-subtitle-2 font-weight-medium">Labels</span>
          <span class="text-caption text-medium-emphasis">Apply Labels</span>
        </div>

        <!-- 搜尋框 -->
        <div class="px-4 pb-3">
          <VTextField
            v-model="searchQuery"
            placeholder="Search labels..."
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="ri-search-line"
            clearable
            data-activity="advanced-label-search-input"
          />
        </div>

        <!-- 已選擇的標籤 -->
        <template v-if="selectedLabels.length > 0">
          <div class="px-4 py-2 d-flex justify-space-between align-center">
            <span class="text-caption font-weight-medium text-medium-emphasis">Selected</span>
            <VBtn
              variant="text"
              size="x-small"
              color="primary"
              data-activity="advanced-label-clear-all"
              @click="clearAllLabels"
            >
              Clear All
            </VBtn>
          </div>

          <VList
            class="py-0 selected-labels-list"
            max-height="180"
          >
            <VListItem
              v-for="label in selectedLabels"
              :key="label.id"
              density="compact"
              class="px-4"
              data-activity="advanced-selected-label-item"
            >
              <template #prepend>
                <VIcon
                  color="success"
                  size="20"
                  icon="ri-check-line"
                />
              </template>

              <VListItemTitle class="d-flex align-center gap-2">
                <span
                  class="label-color-dot"
                  :style="{ backgroundColor: label.color }"
                />
                <span>{{ label.name }}</span>
              </VListItemTitle>

              <template #append>
                <VBtn
                  icon
                  variant="text"
                  size="x-small"
                  data-activity="advanced-deselect-label"
                  @click="toggleLabel(label)"
                >
                  <VIcon
                    size="18"
                    icon="ri-close-line"
                  />
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </template>

        <!-- 可選擇的標籤列表 -->
        <template v-if="unselectedLabels.length > 0">
          <div class="px-4 py-2">
            <span class="text-caption font-weight-medium text-medium-emphasis">Available</span>
          </div>

          <VList
            class="py-0 available-labels-list"
            max-height="200"
          >
            <VListItem
              v-for="label in unselectedLabels"
              :key="label.id"
              density="compact"
              class="px-4"
              data-activity="advanced-available-label-item"
              @click="toggleLabel(label)"
            >
              <template #prepend>
                <div
                  class="label-color-dot"
                  :style="{ backgroundColor: label.color }"
                />
              </template>

              <VListItemTitle>
                {{ label.name }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </template>

        <!-- 無搜尋結果提示 -->
        <div
          v-if="searchQuery && unselectedLabels.length === 0 && selectedLabels.length === 0"
          class="px-4 py-6 text-center"
        >
          <VIcon
            size="48"
            color="disabled"
            icon="ri-search-line"
          />
          <p class="text-body-2 text-medium-emphasis mt-2">
            No labels found
          </p>
        </div>

        <VDivider class="my-2" />

        <!-- 底部固定按鈕 -->
        <div class="px-4 py-3">
          <VBtn
            block
            variant="outlined"
            color="primary"
            size="small"
            class="mb-2 text-none"
            prepend-icon="ri-add-line"
            data-activity="advanced-create-label-button"
            @click="isCreatingLabel = true"
          >
            Add Label
          </VBtn>
          <VBtn
            block
            variant="outlined"
            color="default"
            size="small"
            class="text-none"
            prepend-icon="ri-settings-3-line"
            data-activity="advanced-manage-label-button"
            @click="handleManageLabels"
          >
            Label Management
          </VBtn>
        </div>
      </VCardText>

      <!-- 新增標籤畫面 -->
      <VCardText
        v-else
        class="pa-0"
      >
        <!-- 標題列 -->
        <div class="px-4 pt-4 pb-3 d-flex align-center gap-2">
          <VBtn
            icon
            variant="text"
            size="x-small"
            data-activity="advanced-back-to-list"
            @click="cancelCreateLabel"
          >
            <VIcon icon="ri-arrow-left-line" />
          </VBtn>
          <span class="text-subtitle-2 font-weight-medium">Create New Label</span>
        </div>

        <!-- 標籤名稱輸入 -->
        <div class="px-4 pb-4">
          <VTextField
            v-model="newLabelName"
            label="Label Name"
            placeholder="Enter label name"
            density="compact"
            variant="outlined"
            hide-details
            autofocus
            data-activity="advanced-new-label-name-input"
          />
        </div>

        <!-- 顏色選擇區 -->
        <div class="px-4 pb-2">
          <div class="text-caption font-weight-medium text-medium-emphasis mb-2">
            Select Color
          </div>

          <!-- 前兩排：預設顏色 -->
          <div class="color-palette mb-3">
            <div
              v-for="color in predefinedColors"
              :key="color"
              class="color-option"
              :class="{ selected: newLabelColor.toUpperCase() === color.toUpperCase() }"
              :style="{ backgroundColor: color }"
              data-activity="advanced-color-option"
              @click="selectPredefinedColor(color)"
            />
          </div>

          <!-- 第三排：自訂顏色 -->
          <div class="text-caption font-weight-medium text-medium-emphasis mb-2">
            Custom Color
          </div>
          <div class="d-flex gap-2 align-center">
            <!-- 顏色預覽框（點擊開啟調色盤） -->
            <VMenu
              v-model="showColorPicker"
              :close-on-content-click="false"
              location="bottom start"
            >
              <template #activator="{ props: colorPickerProps }">
                <div
                  v-bind="colorPickerProps"
                  class="custom-color-preview"
                  :style="{ backgroundColor: newLabelColor }"
                  data-activity="advanced-custom-color-preview"
                />
              </template>

              <VCard>
                <VCardText class="pa-2">
                  <VColorPicker
                    v-model="newLabelColor"
                    mode="hexa"
                    :modes="['hexa']"
                    hide-canvas
                    hide-inputs
                    :swatches="[predefinedColors]"
                    show-swatches
                    data-activity="advanced-color-picker"
                  />
                </VCardText>
              </VCard>
            </VMenu>

            <!-- Hex 色碼輸入框 -->
            <VTextField
              :model-value="newLabelColor"
              placeholder="#6699CC"
              density="compact"
              variant="outlined"
              hide-details
              maxlength="7"
              data-activity="advanced-custom-color-input"
              @update:model-value="validateHexColor"
            />
          </div>
        </div>

        <VDivider class="my-3" />

        <!-- 底部操作按鈕 -->
        <div class="px-4 py-3 d-flex gap-2 justify-end">
          <VBtn
            variant="text"
            color="default"
            size="small"
            class="text-none"
            data-activity="advanced-cancel-create-label"
            @click="cancelCreateLabel"
          >
            Cancel
          </VBtn>
          <VBtn
            variant="flat"
            color="primary"
            size="small"
            class="text-none"
            :disabled="!newLabelName.trim()"
            data-activity="advanced-confirm-create-label"
            @click="confirmCreateLabel"
          >
            Confirm
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VMenu>
</template>

<style scoped lang="scss">
// 標籤顏色點
.label-color-dot {
  display: inline-block;
  inline-size: 12px;
  block-size: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

// 顏色選擇調色板（Grid 佈局）
.color-palette {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

// 單個顏色選項
.color-option {
  inline-size: 48px;
  block-size: 48px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;

  &.selected {
    border-color: rgb(var(--v-theme-primary));
    box-shadow: 0 0 0 3px rgb(var(--v-theme-primary) / 20%);

    // 選中狀態顯示勾選圖示
    &::after {
      content: '✓';
      position: absolute;
      inset-block-start: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    }
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  }
}

// 自訂顏色預覽框
.custom-color-preview {
  inline-size: 40px;
  block-size: 40px;
  border-radius: 6px;
  border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;

  // 添加點擊提示圖示
  &::before {
    content: '🎨';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    opacity: 0.7;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }
}

// 列表滾動條樣式
.selected-labels-list,
.available-labels-list {
  overflow-y: auto;

  &::-webkit-scrollbar {
    inline-size: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(var(--v-theme-on-surface) / 5%);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-on-surface) / 20%);
    border-radius: 3px;

    &:hover {
      background: rgb(var(--v-theme-on-surface) / 30%);
    }
  }
}
</style>

<style>
/* 可點擊列表項目的 hover 效果（全域樣式） */
.v-list-item[data-activity="advanced-available-label-item"] {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.v-list-item[data-activity="advanced-available-label-item"]:hover {
  background-color: rgb(var(--v-theme-on-surface) / 8%);
}
</style>

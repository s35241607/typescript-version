<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Label {
  id: string
  name: string
  color: string
}

const props = defineProps<{
  modelValue?: Label[]
  availableLabels?: Label[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Label[]]
  'create': [label: Omit<Label, 'id'>]
  'manage': []
}>()

const isMenuOpen = ref(false)
const isCreatingLabel = ref(false)
const searchQuery = ref('')
const newLabelName = ref('')
const newLabelColor = ref('#6699cc')
const showColorPicker = ref(false)

const predefinedColors = [
  '#e91e63',
  '#f44336',
  '#c2185b',
  '#ff7043',
  '#ff9800',
  '#ffeb3b',
  '#009688',
  '#a5d6a7',
  '#64b5f6',
  '#f5f5f5',
  '#9c27b0',
  '#673ab7',
  '#455a64',
  '#9e9e9e',
]

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

function toggleLabel(label: Label) {
  const index = selectedLabels.value.findIndex(l => l.id === label.id)
  const newLabels = [...selectedLabels.value]

  if (index > -1)
    newLabels.splice(index, 1)
  else
    newLabels.push(label)

  emit('update:modelValue', newLabels)
}

function clearAllLabels() {
  emit('update:modelValue', [])
}

function cancelCreateLabel() {
  isCreatingLabel.value = false
  newLabelName.value = ''
  newLabelColor.value = '#6699cc'
}

function confirmCreateLabel() {
  if (!newLabelName.value.trim())
    return

  emit('create', {
    name: newLabelName.value.trim(),
    color: newLabelColor.value,
  })

  cancelCreateLabel()
}

function handleManageLabels() {
  emit('manage')
  isMenuOpen.value = false
}
</script>

<template>
  <VMenu
    v-model="isMenuOpen"
    :close-on-content-click="false"
    location="bottom"
    max-width="400"
  >
    <template #activator="{ props: activatorProps }">
      <VBtn
        v-bind="activatorProps"
        variant="outlined"
        color="default"
        data-activity="label-selector-trigger"
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

    <VCard min-width="380">
      <VCardText
        v-if="!isCreatingLabel"
        class="pa-0"
      >
        <div class="px-4 pt-4 pb-2 d-flex justify-space-between align-center">
          <span class="text-subtitle-2 font-weight-medium">Label</span>
          <span class="text-caption text-medium-emphasis">Apply</span>
        </div>

        <div class="px-4 pb-3">
          <VTextField
            v-model="searchQuery"
            placeholder="Search"
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="ri-search-line"
            data-activity="label-search-input"
          />
        </div>

        <div class="px-4 py-2 d-flex justify-space-between align-center">
          <span class="text-caption font-weight-medium">Selected</span>
          <VBtn
            v-if="selectedLabels.length > 0"
            variant="text"
            size="x-small"
            color="primary"
            data-activity="label-clear-all"
            @click="clearAllLabels"
          >
            Clear
          </VBtn>
        </div>

        <VList
          class="py-0"
          max-height="200"
          style="overflow-y: auto;"
        >
          <VListItem
            v-for="label in selectedLabels"
            :key="label.id"
            density="compact"
            class="px-4"
            data-activity="selected-label-item"
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
                data-activity="deselect-label"
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

        <!-- 可選擇的標籤列表 -->
        <div
          v-if="unselectedLabels.length > 0"
          class="px-4 py-2"
        >
          <span class="text-caption font-weight-medium">Available</span>
        </div>

        <VList
          v-if="unselectedLabels.length > 0"
          class="py-0"
          max-height="200"
          style="overflow-y: auto;"
        >
          <VListItem
            v-for="label in unselectedLabels"
            :key="label.id"
            density="compact"
            class="px-4"
            data-activity="available-label-item"
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

        <VDivider class="my-2" />

        <div class="px-4 py-3">
          <VBtn
            block
            variant="outlined"
            color="primary"
            size="small"
            class="mb-2 text-none"
            data-activity="create-label-button"
            @click="isCreatingLabel = true"
          >
            Create Label
          </VBtn>
          <VBtn
            block
            variant="outlined"
            color="default"
            size="small"
            class="text-none"
            data-activity="manage-label-button"
            @click="handleManageLabels"
          >
            Manage Labels
          </VBtn>
        </div>
      </VCardText>

      <VCardText
        v-else
        class="pa-0"
      >
        <div class="px-4 pt-4 pb-3">
          <span class="text-subtitle-2 font-weight-medium">Create Label</span>
        </div>

        <div class="px-4 pb-4">
          <VTextField
            v-model="newLabelName"
            placeholder="Label Name"
            density="compact"
            variant="outlined"
            hide-details
            autofocus
            data-activity="new-label-name-input"
          />
        </div>

        <div class="px-4 pb-3">
          <div class="color-palette">
            <div
              v-for="color in predefinedColors"
              :key="color"
              class="color-option"
              :class="{ selected: newLabelColor === color }"
              :style="{ backgroundColor: color }"
              data-activity="color-option"
              @click="newLabelColor = color"
            />
          </div>
        </div>

        <div class="px-4 pb-4">
          <div class="d-flex gap-2 align-center">
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
                  data-activity="custom-color-preview"
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
                  />
                </VCardText>
              </VCard>
            </VMenu>

            <VTextField
              v-model="newLabelColor"
              placeholder="#6699cc"
              density="compact"
              variant="outlined"
              hide-details
              data-activity="custom-color-input"
            />
          </div>
        </div>

        <VDivider />

        <div class="px-4 py-3 d-flex gap-2 justify-end">
          <VBtn
            variant="text"
            color="default"
            size="small"
            class="text-none"
            data-activity="cancel-create-label"
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
            data-activity="confirm-create-label"
            @click="confirmCreateLabel"
          >
            Create
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VMenu>
</template>

<style scoped lang="scss">
.label-color-dot {
  display: inline-block;
  inline-size: 12px;
  block-size: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.color-palette {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.color-option {
  inline-size: 48px;
  block-size: 48px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  &.selected {
    border-color: rgb(var(--v-theme-primary));
    box-shadow: 0 0 0 2px rgb(var(--v-theme-primary) / 20%);
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }
}

.custom-color-preview {
  inline-size: 40px;
  block-size: 40px;
  border-radius: 4px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.v-list {
  &::-webkit-scrollbar {
    inline-size: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(var(--v-theme-on-surface) / 5%);
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
/* 可點擊列表項目的 hover 效果 */
.v-list-item[data-activity="available-label-item"] {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.v-list-item[data-activity="available-label-item"]:hover {
  background-color: rgb(var(--v-theme-on-surface) / 5%);
}
</style>

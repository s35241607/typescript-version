<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

interface TagItem {
  id: string
  label: string
  color?: string
}

const props = defineProps<{
  modelValue?: string[]
  initial?: TagItem[]
}>()

const emit = defineEmits(['update:modelValue'])

const items = ref<TagItem[]>(props.initial ?? [
  { id: 'discussion', label: 'discussion', color: '#4a90e2' },
  { id: 'documentation', label: 'documentation', color: '#f5a623' },
  { id: 'enhancement', label: 'enhancement', color: '#7ed321' },
  { id: 'suggestion', label: 'suggestion', color: '#9bcdff' },
])

const selected = ref<string[]>(props.modelValue ?? [])
const search = ref('')
const newLabel = ref('')
const newColor = ref('#6699cc')
const showColorPicker = ref(false)

// whether the create dialog is open
const isCreateDialogOpen = ref(false)

watch(selected, v => emit('update:modelValue', v))

function createTag() {
  if (!newLabel.value)
    return

  const id = newLabel.value.toLowerCase().replace(/\s+/g, '-')
  const tag: TagItem = { id, label: newLabel.value, color: newColor.value }

  items.value.unshift(tag)
  selected.value.push(id)

  // reset inputs after successful creation
  newLabel.value = ''
  newColor.value = '#6699cc'
}

function openCreateDialog() {
  isCreateDialogOpen.value = true
}

function cancelCreate() {
  // reset inputs and close dialog
  newLabel.value = ''
  newColor.value = '#6699cc'
  isCreateDialogOpen.value = false
}

function togglePresetColor(c: string) {
  newColor.value = c
}

function createTagAndExit() {
  createTag()
  isCreateDialogOpen.value = false
}

const visibleItems = computed(() => {
  if (!search.value)
    return items.value

  const q = search.value.toLowerCase()

  return items.value.filter(t => t.label.toLowerCase().includes(q))
})

// helper to safely extract original data from Vuetify slot item
function _getRaw(item: any) {
  if (!item)
    return null

  // common shapes: the original object, or { props: ... }, or { item: ... }, or has 'title'
  if (item.label || item.color || item.id)
    return item

  // if item is a primitive (e.g., selection may pass string id), try to resolve
  if (typeof item === 'string') {
    const found = items.value.find(i => i.id === item)
    if (found)
      return found

    return {
      id: item,
      label: item,
    }
  }

  if (item.props)
    return item.props

  if (item.item)
    return item.item

  if (item.title)
    return { label: item.title, id: item.value }

  return item
}

function _getLabelFromSlot(item: any) {
  const r = _getRaw(item)

  return (r && (r.label ?? r.title ?? r.id)) ?? ''
}

function _getColorFromSlot(item: any) {
  const r = _getRaw(item)

  return (r && (r.color ?? r.bg ?? '')) ?? ''
}

const _presetColors = [
  // 第一行 - 精確匹配圖片顏色
  '#e91e63', // Pink/Magenta
  '#f44336', // Red
  '#ad1457', // Dark Pink
  '#ff5722', // Deep Orange
  '#ff9800', // Orange
  '#ffeb3b', // Yellow
  '#00e676', // Green
  // 第二行
  '#8bc34a', // Light Green
  '#2196f3', // Blue
  '#ffffff', // White
  '#9c27b0', // Purple
  '#512da8', // Deep Purple
  '#607d8b', // Blue Grey
  '#9e9e9e', // Grey
]
</script>

<template>
  <div>
    <VSelect
      v-model="selected"
      :items="visibleItems"
      label="標記"
      multiple
      chips
      deletable-chips
      item-title="label"
      item-value="id"
      hide-details
      class="tag-selector"
      :menu-props="{
        maxHeight: '400px',
        closeOnContentClick: false,
        contentClass: 'tag-selector-menu',
      }"
    >
      <template #prepend-item>
        <VListItem class="menu-header">
          <div class="menu-content">
            <div class="menu-title">
              選擇標記(s)
            </div>

            <VTextField
              v-model="search"
              placeholder="搜尋"
              variant="outlined"
              density="compact"
              hide-details
              clearable
              prepend-inner-icon="ri-search-line"
              class="search-field"
            />
          </div>
        </VListItem>
      </template>

      <template #item="{ item, props: itemProps }">
        <VListItem
          v-bind="itemProps"
          class="tag-list-item"
          :class="{ selected: selected.includes(_getRaw(item)?.id || item.value) }"
        >
          <template #prepend>
            <VIcon
              v-if="selected.includes(_getRaw(item)?.id || item.value)"
              icon="ri-check-line"
              class="check-icon"
              size="small"
            />
            <div
              v-else
              class="color-indicator"
              :style="{ backgroundColor: _getColorFromSlot(item) || '#bdbdbd' }"
            />
          </template>

          <VListItemTitle class="item-label">
            {{ _getLabelFromSlot(item) }}
          </VListItemTitle>
        </VListItem>
      </template>

      <template #chip="{ props: chipProps, item }">
        <VChip
          v-bind="chipProps"
          :color="_getColorFromSlot(item)"
          size="small"
        />
      </template>

      <template #append-item>
        <!-- Fixed Footer -->
        <div class="menu-footer">
          <div>
            <VBtn
              variant="text"
              data-activity="create-project-label"
              @click="openCreateDialog"
            >
              建立專案標記 (label)
            </VBtn>
            <VBtn
              variant="text"
              data-activity="manage-project-labels"
              @click.prevent="() => {}"
            >
              管理專案標記 (label)
            </VBtn>
          </div>
        </div>
      </template>
    </VSelect>

    <!-- Create Tag Dialog -->
    <VDialog
      v-model="isCreateDialogOpen"
      max-width="400px"
      persistent
    >
      <VCard
        class="create-card"
        title="建立標記 (label)"
      >
        <VCardText>
          <VTextField
            v-model="newLabel"
            placeholder="標籤名稱"
            variant="outlined"
            density="compact"
            hide-details
            class="label-input"
          />

          <div class="color-section">
            <div class="color-swatches">
              <button
                v-for="c in _presetColors"
                :key="c"
                class="color-swatch"
                :class="{ selected: newColor === c }"
                :style="{ backgroundColor: c }"
                :aria-label="c"
                @click.prevent="togglePresetColor(c)"
              />
            </div>

            <div class="hex-input-row">
              <div class="color-picker-container">
                <VBtn
                  variant="text"
                  size="small"
                  class="color-picker-btn"
                  @click="showColorPicker = !showColorPicker"
                >
                  <div
                    class="color-preview-btn"
                    :style="{ backgroundColor: newColor }"
                  />
                </VBtn>

                <VMenu
                  v-model="showColorPicker"
                  :close-on-content-click="false"
                  location="bottom start"
                >
                  <VCard class="color-picker-card">
                    <VColorPicker
                      v-model="newColor"
                      mode="hexa"
                      show-swatches
                      hide-canvas
                      hide-inputs
                      class="compact-color-picker"
                    />
                  </VCard>
                </VMenu>
              </div>

              <VTextField
                v-model="newColor"
                placeholder="#6699cc"
                variant="outlined"
                density="compact"
                hide-details
                class="hex-input"
              />
            </div>
          </div>
        </VCardText>

        <VCardActions class="create-actions">
          <VSpacer />
          <VBtn
            variant="text"
            @click="cancelCreate"
          >
            取消
          </VBtn>
          <VBtn
            color="primary"
            :disabled="!newLabel"
            @click="createTagAndExit"
          >
            建立
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.tag-selector {
  max-inline-size: 420px;
}

/* Menu header styling */
.menu-header {
  padding-block: 0 !important;
  padding-inline: 0 !important;
}

.menu-content {
  inline-size: 100%;
  padding-block: 16px;
  padding-inline: 16px;
}

.menu-title {
  font-weight: 600;
  font-size: 16px;
  margin-block-end: 16px;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.search-field {
  margin-block-end: 8px;
}

/* Create form styling */
.create-form {
  margin-block-start: 8px;
}

.label-input {
  margin-block-end: 20px;
}

.color-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.color-swatches {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  max-inline-size: 100%;
}

.color-swatch {
  inline-size: 28px;
  block-size: 28px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;

  &[style*="#ffffff"], &[style*="#FFFFFF"] {
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }

  &.selected {
    border-color: rgb(var(--v-theme-primary));
    transform: scale(1.05);

    &[style*="#ffffff"], &[style*="#FFFFFF"] {
      border-color: rgb(var(--v-theme-primary));
    }
  }

  &:hover {
    transform: scale(1.05);
  }
}

.hex-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-picker-container {
  position: relative;
}

.color-picker-btn {
  min-inline-size: 40px !important;
  block-size: 40px !important;
  padding: 6px !important;
}

.color-preview-btn {
  inline-size: 28px;
  block-size: 28px;
  border-radius: 6px;
  border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  cursor: pointer;
}

.compact-color-picker {
  max-inline-size: 280px;
}

.hex-input {
  flex: 1;
}

/* Visual tweaks to match attached screenshot */
.create-card {
  background-color: rgb(var(--v-surface));
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

/* Make the input show a blue outline when focused inside the create card */
.create-card .v-field--focused .v-field__outline {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 4px rgba(var(--v-theme-primary) / 12%);
}

/* Hex input box styling */
.create-card .hex-input .v-field__outline {
  background: transparent;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
}

/* Make the create actions buttons more compact and muted */
.create-actions .v-btn {
  min-inline-size: 72px;
}

.color-picker-btn .color-preview-btn {
  border-radius: 4px;
  inline-size: 26px;
  block-size: 26px;
}

/* List items styling */
.check-icon {
  margin-inline-end: 12px;
}

.color-indicator {
  inline-size: 18px;
  block-size: 18px;
  border-radius: 50%;
  margin-inline-end: 12px;
  flex-shrink: 0;
}

.item-label {
  font-size: 14px;
}

.tag-list-item {
  &.selected {
    background-color: rgba(var(--v-theme-primary) / 8%);

    .check-icon {
      color: rgb(var(--v-theme-primary));
    }
  }
}

/* Footer styling */
.menu-footer {
  padding-block: 12px;
  padding-inline: 16px;
  border-block-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
}
</style>

<!-- Consolidated global (unscoped) styles for the tag selector menu -->
<style>
/* Ensure the menu can scroll internally and avoid duplicate/contradictory rules */
.tag-selector-menu {
  max-block-size: 400px;
  overflow-y: auto;
  background-clip: padding-box;
}

.tag-selector-menu .v-list {
  padding-block: 0 !important;
}

/* Make list items compact and aligned with the menu layout */
.tag-selector-menu .v-list-item {
  padding-inline: 0 !important;
  min-block-size: auto !important;
}

.tag-selector-menu .v-list-item__content {
  padding-block: 8px;
}
</style>

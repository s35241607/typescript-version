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

// backups to restore on cancel
const _dialogBackup = ref<{ label: string; color: string } | null>(null)

// whether the select menu is showing the create UI
const inCreateMode = ref(false)

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
  _dialogBackup.value = null
  inCreateMode.value = false
}

function openCreateDialog() {
  // save current input state so we can restore on cancel
  _dialogBackup.value = { label: newLabel.value, color: newColor.value }
  inCreateMode.value = true
}

function cancelCreate() {
  // restore backed up values (if any) and close dialog
  if (_dialogBackup.value) {
    newLabel.value = _dialogBackup.value.label
    newColor.value = _dialogBackup.value.color
  }
  else {
    newLabel.value = ''
    newColor.value = '#6699cc'
  }

  _dialogBackup.value = null
  inCreateMode.value = false
}

function togglePresetColor(c: string) {
  newColor.value = c
}

function createTagAndExit() {
  createTag()
  inCreateMode.value = false
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
      :items="inCreateMode ? [] : visibleItems"
      :no-data-text="inCreateMode ? '' : 'No data available'"
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
              <template v-if="!inCreateMode">
                選擇標記(s)
              </template>
              <template v-else>
                建立標記 (label)
              </template>
            </div>

            <template v-if="!inCreateMode">
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
            </template>

            <template v-else>
              <div class="create-form">
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
                        icon
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
                        <VColorPicker
                          v-model="newColor"
                          mode="hexa"
                          :swatches="[]"
                          show-swatches
                          hide-canvas
                          hide-inputs
                          class="compact-color-picker"
                        />
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
              </div>
            </template>
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

      <template #selection="{ item, index }">
        <!-- render selected chips as color-only pill (no text) -->
        <div
          :key="index"
          class="v-chip--selection"
        >
          <span
            class="chip-dot"
            :style="{ backgroundColor: _getColorFromSlot(item) || '#bdbdbd' }"
            aria-hidden="true"
          />
        </div>
      </template>

      <template #append-item>
        <!-- Fixed Footer -->
        <div class="menu-footer">
          <div v-if="!inCreateMode">
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

          <div
            v-else
            class="d-flex justify-end gap-2"
          >
            <VBtn
              variant="text"
              data-activity="cancel-create-label"
              @click="cancelCreate"
            >
              取消
            </VBtn>
            <VBtn
              color="primary"
              data-activity="create-label-submit"
              @click="createTagAndExit"
            >
              建立
            </VBtn>
          </div>
        </div>
      </template>
    </VSelect>

    <!-- create UI moved inside select menu via inCreateMode -->
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
  grid-template-columns: repeat(7, 1fr);
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

/* Selection chips styling */
.v-chip--selection {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-block: 4px;
  padding-inline: 8px;
  background-color: rgba(0 0 0 / 6%);
  border-radius: 16px;
  margin-inline-end: 6px;
}

.chip-dot {
  inline-size: 18px;
  block-size: 10px;
  border-radius: 999px;
  display: inline-block;
  border: 1px solid rgba(0 0 0 / 8%);
}

/* Footer styling */
.menu-footer {
  padding-block: 12px;
  padding-inline: 16px;
  border-block-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
}
</style>

<style>
/* Global styles for the tag selector menu */
.tag-selector-menu {
  max-block-size: 400px;
  background-clip: padding-box;
}

.tag-selector-menu .v-list {
  padding-block: 0 !important;
}

.tag-selector-menu .v-list-item {
  min-block-size: auto !important;
}

.tag-selector-menu .v-list-item__content {
  padding-block: 8px;
}
</style>

<style>
/* Global styles for the tag selector menu */
.tag-selector-menu {
  /* Ensure proper scrolling within the menu content */
  max-block-size: 400px;
  overflow-y: auto;
  background-clip: padding-box;
}

.tag-selector-menu .v-list {
  padding-block: 0 !important;
}

.tag-selector-menu .v-list-item {
  padding-inline: 0 !important;
}
</style>

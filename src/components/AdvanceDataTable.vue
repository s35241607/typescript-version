<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'

interface Column {
  title: string
  key: string
  width?: number
  sortable?: boolean
  draggable?: boolean
  resizable?: boolean
  filterable?: boolean
  editable?: boolean
  formatter?: (value: any) => string
  hidden?: boolean
}

interface Row {
  id: string | number
  [key: string]: any
}

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  items: {
    type: Array as PropType<Row[]>,
    required: true,
  },
  rowNumberVisible: {
    type: Boolean,
    default: true,
  },
  rowDraggable: {
    type: Boolean,
    default: true,
  },
  columnDraggable: {
    type: Boolean,
    default: true,
  },
  columnResizable: {
    type: Boolean,
    default: true,
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  expandable: {
    type: Boolean,
    default: false,
  },
  editableOnClick: {
    type: Boolean,
    default: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  headerSticky: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:items',
  'row-click',
  'row-edit',
  'row-drag',
  'column-drag',
  'column-resize',
  'sort',
])

// 狀態管理
const tableColumns = ref<Column[]>([...props.columns])
const tableItems = ref<Row[]>([...props.items])
const sortBy = ref<string>('')
const sortDesc = ref<boolean>(false)
const expandedRows = ref<Set<string | number>>(new Set())
const editingCell = ref<{ rowId: string | number; key: string } | null>(null)
const editingValue = ref<any>(null)
const resizingColumn = ref<string | null>(null)
const startX = ref<number>(0)
const startWidth = ref<number>(0)

// 監聽 props 變化
watch(() => props.items, newItems => {
  tableItems.value = [...newItems]
}, { deep: true })

watch(() => props.columns, newColumns => {
  tableColumns.value = [...newColumns]
}, { deep: true })

// 計算屬性
const visibleColumns = computed(() => {
  return tableColumns.value.filter(col => !col.hidden)
})

const displayItems = computed(() => {
  let items = [...tableItems.value]

  // 排序
  if (sortBy.value) {
    items = items.sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]

      if (typeof aVal === 'string' && typeof bVal === 'string')
        return sortDesc.value ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal)

      if (aVal < bVal)
        return sortDesc.value ? 1 : -1
      if (aVal > bVal)
        return sortDesc.value ? -1 : 1

      return 0
    })
  }

  return items
})

// 排序功能
const handleSort = (key: string) => {
  if (!props.sortable)
    return

  if (sortBy.value === key) {
    sortDesc.value = !sortDesc.value
  }
  else {
    sortBy.value = key
    sortDesc.value = false
  }

  emit('sort', { key, direction: sortDesc.value ? 'desc' : 'asc' })
}

// 折疊/展開功能
const toggleExpand = (rowId: string | number) => {
  if (!props.expandable)
    return

  if (expandedRows.value.has(rowId))
    expandedRows.value.delete(rowId)
  else
    expandedRows.value.add(rowId)
}

const isExpanded = (rowId: string | number): boolean => {
  return expandedRows.value.has(rowId)
}

// 列拖曳功能
let draggedRowId: string | number | null = null

const handleRowDragStart = (event: DragEvent, rowId: string | number) => {
  if (!props.rowDraggable)
    return

  draggedRowId = rowId
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(rowId))
  }
}

const handleRowDragOver = (event: DragEvent) => {
  if (!props.rowDraggable)
    return

  event.preventDefault()
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = 'move'
}

const handleRowDrop = (event: DragEvent, targetRowId: string | number) => {
  if (!props.rowDraggable || !draggedRowId || draggedRowId === targetRowId)
    return

  event.preventDefault()

  const draggedIndex = tableItems.value.findIndex(item => item.id === draggedRowId)
  const targetIndex = tableItems.value.findIndex(item => item.id === targetRowId)

  if (draggedIndex > -1 && targetIndex > -1) {
    const [removed] = tableItems.value.splice(draggedIndex, 1)

    tableItems.value.splice(targetIndex, 0, removed)

    emit('update:items', tableItems.value)
    emit('row-drag', { draggedId: draggedRowId, targetId: targetRowId, newItems: tableItems.value })
  }

  draggedRowId = null
}

// 欄位拖曳功能
let draggedColumn: string | null = null

const handleColumnDragStart = (event: DragEvent, columnKey: string) => {
  if (!props.columnDraggable)
    return

  draggedColumn = columnKey
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', columnKey)
  }
}

const handleColumnDragOver = (event: DragEvent) => {
  if (!props.columnDraggable)
    return

  event.preventDefault()
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = 'move'
}

const handleColumnDrop = (event: DragEvent, targetColumnKey: string) => {
  if (!props.columnDraggable || !draggedColumn || draggedColumn === targetColumnKey)
    return

  event.preventDefault()

  const draggedIndex = tableColumns.value.findIndex(col => col.key === draggedColumn)
  const targetIndex = tableColumns.value.findIndex(col => col.key === targetColumnKey)

  if (draggedIndex > -1 && targetIndex > -1) {
    const [removed] = tableColumns.value.splice(draggedIndex, 1)

    tableColumns.value.splice(targetIndex, 0, removed)

    emit('column-drag', { draggedKey: draggedColumn, targetKey: targetColumnKey, newColumns: tableColumns.value })
  }

  draggedColumn = null
}

// 欄位寬度調整
const handleColumnResizeStart = (event: MouseEvent, columnKey: string, currentWidth: number) => {
  if (!props.columnResizable)
    return

  resizingColumn.value = columnKey
  startX.value = event.clientX
  startWidth.value = currentWidth || 100

  document.addEventListener('mousemove', handleColumnResizeMove)
  document.addEventListener('mouseup', handleColumnResizeEnd)
}

const handleColumnResizeMove = (event: MouseEvent) => {
  if (!resizingColumn.value)
    return

  const diffX = event.clientX - startX.value
  const newWidth = Math.max(50, startWidth.value + diffX)

  const columnIndex = tableColumns.value.findIndex(col => col.key === resizingColumn.value)
  if (columnIndex > -1)
    tableColumns.value[columnIndex].width = newWidth
}

const handleColumnResizeEnd = () => {
  if (resizingColumn.value) {
    emit('column-resize', { key: resizingColumn.value, width: tableColumns.value.find(col => col.key === resizingColumn.value)?.width })
    resizingColumn.value = null
  }

  document.removeEventListener('mousemove', handleColumnResizeMove)
  document.removeEventListener('mouseup', handleColumnResizeEnd)
}

// 點擊編輯功能
const handleCellClick = (rowId: string | number, key: string, value: any) => {
  if (props.editableOnClick && tableColumns.value.find(col => col.key === key)?.editable) {
    editingCell.value = { rowId, key }
    editingValue.value = value
  }

  emit('row-click', { rowId, key, value })
}

const handleCellEdit = (rowId: string | number, key: string, value: any) => {
  const rowIndex = tableItems.value.findIndex(item => item.id === rowId)
  if (rowIndex > -1) {
    tableItems.value[rowIndex][key] = value
    emit('update:items', tableItems.value)
    emit('row-edit', { rowId, key, value, row: tableItems.value[rowIndex] })
  }

  editingCell.value = null
}

const cancelEdit = () => {
  editingCell.value = null
}

// 確保元件卸載時清理監聽器
onMounted(() => {
  document.removeEventListener('mousemove', handleColumnResizeMove)
  document.removeEventListener('mouseup', handleColumnResizeEnd)
})

// 格式化顯示函數
const formatCellValue = (value: any, column: Column) => {
  if (column.formatter)
    return column.formatter(value)

  return value !== undefined && value !== null ? String(value) : ''
}
</script>

<template>
  <div class="advanced-data-table">
    <VCard>
      <div
        class="table-wrapper"
        :class="{ 'sticky-header': headerSticky }"
      >
        <VTable
          :density="dense ? 'compact' : 'default'"
          fixed-header
        >
          <thead>
            <tr>
              <!-- 行號欄位 -->
              <th
                v-if="rowNumberVisible"
                class="row-number-header"
                width="50"
              >
                #
              </th>

              <!-- 折疊按鈕欄位 -->
              <th
                v-if="expandable"
                class="expand-header"
                width="40"
              />

              <!-- 數據欄位 -->
              <th
                v-for="column in visibleColumns"
                :key="column.key"
                :width="column.width ? `${column.width}px` : 'auto'"
                class="column-header"
                :class="{
                  sortable: column.sortable && sortable,
                  sorted: sortBy === column.key,
                  desc: sortBy === column.key && sortDesc,
                  draggable: column.draggable && columnDraggable,
                  resizable: column.resizable && columnResizable,
                }"
                draggable="true"
                @dragstart="handleColumnDragStart($event, column.key)"
                @dragover="handleColumnDragOver"
                @drop="handleColumnDrop($event, column.key)"
                @click="column.sortable && sortable ? handleSort(column.key) : null"
              >
                <div class="column-header-content">
                  {{ column.title }}
                  <VIcon
                    v-if="column.sortable && sortable && sortBy === column.key"
                    :icon="sortDesc ? 'ri-arrow-down-line' : 'ri-arrow-up-line'"
                    size="small"
                    class="sort-icon"
                  />
                </div>
                <div
                  v-if="column.resizable && columnResizable"
                  class="resize-handle"
                  @mousedown="handleColumnResizeStart($event, column.key, column.width || 100)"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <template
              v-for="(item, index) in displayItems"
              :key="item.id"
            >
              <tr
                class="data-row"
                :class="{
                  draggable: rowDraggable,
                  expanded: isExpanded(item.id),
                }"
                draggable="true"
                @dragstart="handleRowDragStart($event, item.id)"
                @dragover="handleRowDragOver"
                @drop="handleRowDrop($event, item.id)"
              >
                <!-- 行號 -->
                <td
                  v-if="rowNumberVisible"
                  class="row-number"
                >
                  {{ index + 1 }}
                </td>

                <!-- 折疊按鈕 -->
                <td
                  v-if="expandable"
                  class="expand-cell"
                  @click="toggleExpand(item.id)"
                >
                  <VIcon
                    :icon="isExpanded(item.id) ? 'ri-shut-down-line' : mdi-chevron-right'"
                    size="small"
                  />
                </td>

                <!-- 數據欄位 -->
                <td
                  v-for="column in visibleColumns"
                  :key="`${item.id}-${column.key}`"
                  class="data-cell"
                  :class="{
                    editable: column.editable && editableOnClick,
                  }"
                  @click="handleCellClick(item.id, column.key, item[column.key])"
                >
                  <template v-if="editingCell && editingCell.rowId === item.id && editingCell.key === column.key">
                    <VTextField
                      v-model="editingValue"
                      variant="outlined"
                      density="compact"
                      hide-details
                      autofocus
                      @keyup.enter="handleCellEdit(item.id, column.key, editingValue)"
                      @keyup.esc="cancelEdit"
                      @blur="handleCellEdit(item.id, column.key, editingValue)"
                    />
                  </template>
                  <template v-else>
                    {{ formatCellValue(item[column.key], column) }}
                  </template>
                </td>
              </tr>

              <!-- 展開的行內容 -->
              <tr
                v-if="expandable && isExpanded(item.id)"
                class="expanded-row"
              >
                <td
                  :colspan="visibleColumns.length + (rowNumberVisible ? 1 : 0) + (expandable ? 1 : 0)"
                  class="expanded-content"
                >
                  <slot
                    name="expanded-item"
                    :item="item"
                  >
                    <div class="default-expanded-content">
                      <div
                        v-for="column in visibleColumns"
                        :key="`expanded-${item.id}-${column.key}`"
                        class="expanded-field"
                      >
                        <strong>{{ column.title }}:</strong> {{ formatCellValue(item[column.key], column) }}
                      </div>
                    </div>
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </VTable>
      </div>
    </VCard>
  </div>
</template>

<style scoped>
.advanced-data-table {
  position: relative;
  inline-size: 100%;
}

.table-wrapper {
  inline-size: 100%;
  overflow-x: auto;
}

.sticky-header th {
  position: sticky;
  z-index: 2;
  background-color: white;
  inset-block-start: 0;
}

.column-header {
  position: relative;
  user-select: none;
}

.column-header-content {
  display: flex;
  align-items: center;
}

.resize-handle {
  position: absolute;
  background-color: transparent;
  block-size: 100%;
  cursor: col-resize;
  inline-size: 5px;
  inset-block-start: 0;
  inset-inline-end: 0;
}

.resize-handle:hover {
  background-color: rgba(0, 0, 0, 10%);
}

.sortable {
  cursor: pointer;
}

.sort-icon {
  margin-inline-start: 4px;
}

.draggable {
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}

.row-number,
.row-number-header,
.expand-cell,
.expand-header {
  inline-size: 50px;
  text-align: center;
}

.data-cell.editable {
  cursor: pointer;
}

.data-cell.editable:hover {
  background-color: rgba(0, 0, 0, 5%);
}

.expanded-content {
  padding: 16px;
  background-color: rgba(0, 0, 0, 2%);
}

.default-expanded-content {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.expanded-field {
  padding-block: 4px;
  padding-inline: 0;
}
</style>

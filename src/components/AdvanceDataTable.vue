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
  minWidth?: number
  maxWidth?: number
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
  multiColumnResize: {
    type: Boolean,
    default: true,
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
const isShiftKeyPressed = ref<boolean>(false)

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

  // 阻止事件冒泡，避免与其他事件冲突
  event.stopPropagation()
}

const handleColumnDragOver = (event: DragEvent) => {
  if (!props.columnDraggable || !draggedColumn)
    return

  event.preventDefault()

  // 添加视觉反馈
  const target = event.currentTarget as HTMLElement
  if (target && target.classList)
    target.classList.add('column-drag-over')

  if (event.dataTransfer)
    event.dataTransfer.dropEffect = 'move'
}

const handleColumnDrop = (event: DragEvent, targetColumnKey: string) => {
  if (!props.columnDraggable || !draggedColumn || draggedColumn === targetColumnKey)
    return

  event.preventDefault()

  // 移除所有拖曳样式
  document.querySelectorAll('.column-drag-over').forEach(el => {
    el.classList.remove('column-drag-over')
  })

  const draggedIndex = tableColumns.value.findIndex(col => col.key === draggedColumn)
  const targetIndex = tableColumns.value.findIndex(col => col.key === targetColumnKey)

  if (draggedIndex > -1 && targetIndex > -1) {
    const [removed] = tableColumns.value.splice(draggedIndex, 1)

    tableColumns.value.splice(targetIndex, 0, removed)
    emit('column-drag', { draggedKey: draggedColumn, targetKey: targetColumnKey, newColumns: tableColumns.value })
  }

  draggedColumn = null
}

const handleColumnResizeMove = (event: MouseEvent) => {
  if (!resizingColumn.value)
    return

  // 阻止事件冒泡
  event.stopPropagation()
  event.preventDefault()

  // 更新Shift键状态
  isShiftKeyPressed.value = event.shiftKey

  const diffX = event.clientX - startX.value
  const newWidth = Math.max(50, startWidth.value + diffX)

  // 当前调整的列索引
  const columnIndex = tableColumns.value.findIndex(col => col.key === resizingColumn.value)

  if (columnIndex > -1) {
    // 设置当前列的宽度
    tableColumns.value[columnIndex].width = newWidth

    // 如果按住Shift键且启用了多列调整
    if (isShiftKeyPressed.value && props.multiColumnResize) {
      // 获取当前调整列右侧所有可见列
      const rightColumns = visibleColumns.value.slice(visibleColumns.value.findIndex(col => col.key === resizingColumn.value) + 1)

      // 调整所有右侧列的宽度
      rightColumns.forEach(col => {
        const colIndex = tableColumns.value.findIndex(c => c.key === col.key)
        if (colIndex > -1 && tableColumns.value[colIndex].resizable !== false) {
          // 使用相同的宽度增量
          const currentWidth = tableColumns.value[colIndex].width || 100

          tableColumns.value[colIndex].width = Math.max(50, currentWidth + diffX)
        }
      })
    }

    // 更新调整指示线位置
    const resizeGuide = document.getElementById('column-resize-guide')
    if (resizeGuide) {
      const tableRect = document.querySelector('.table-wrapper')?.getBoundingClientRect()
      if (tableRect) {
        const leftPosition = event.clientX - tableRect.left

        resizeGuide.style.left = `${leftPosition}px`
        resizeGuide.style.display = 'block'

        // 如果按住Shift键，显示多列调整指示
        resizeGuide.classList.toggle('multi-column-resize', isShiftKeyPressed.value && props.multiColumnResize)
      }
    }
  }
}

const handleColumnResizeEnd = () => {
  if (resizingColumn.value) {
    const newWidth = tableColumns.value.find(col => col.key === resizingColumn.value)?.width

    emit('column-resize', {
      key: resizingColumn.value,
      width: newWidth,
      isMultiResize: isShiftKeyPressed.value && props.multiColumnResize,
    })

    // 隐藏调整指示线
    const resizeGuide = document.getElementById('column-resize-guide')
    if (resizeGuide) {
      resizeGuide.style.display = 'none'
      resizeGuide.classList.remove('multi-column-resize')
    }

    // 重置状态
    resizingColumn.value = null
    isShiftKeyPressed.value = false
  }

  document.body.classList.remove('resizing-active')

  document.removeEventListener('mousemove', handleColumnResizeMove)
  document.removeEventListener('mouseup', handleColumnResizeEnd)
}

// 格式化顯示函數
const formatCellValue = (value: any, column: Column) => {
  if (column.formatter)
    return column.formatter(value)

  return value !== undefined && value !== null ? String(value) : ''
}

// 辅助函数：计算内容的最大宽度
const calculateMaxContentWidth = (contents: string[]): number => {
  // 创建临时元素以计算文本宽度
  const tempEl = document.createElement('div')

  tempEl.style.position = 'absolute'
  tempEl.style.visibility = 'hidden'
  tempEl.style.whiteSpace = 'nowrap'
  tempEl.style.fontFamily = getComputedStyle(document.body).fontFamily
  tempEl.style.fontSize = getComputedStyle(document.body).fontSize
  tempEl.style.padding = '0 8px' // 添加一些内边距

  document.body.appendChild(tempEl)

  let maxWidth = 0

  contents.forEach(content => {
    tempEl.textContent = content

    const width = tempEl.offsetWidth

    maxWidth = Math.max(maxWidth, width)
  })

  document.body.removeChild(tempEl)

  // 添加一些额外的空间，使其看起来更好
  return maxWidth + 20 // 额外空间
}

// 自动调整列宽，计算单元格内容的最大宽度
const autoAdjustColumnWidth = (columnKey: string) => {
  const column = tableColumns.value.find(col => col.key === columnKey)
  if (!column)
    return

  // 获取所有列中该列的数据
  const cellsContent: string[] = []

  // 首先添加列标题
  cellsContent.push(column.title)

  // 然后添加所有该列的单元格内容
  tableItems.value.forEach(item => {
    const value = item[columnKey]
    const formattedValue = formatCellValue(value, column)

    cellsContent.push(formattedValue)
  })

  // 计算最大宽度
  const calculatedWidth = calculateMaxContentWidth(cellsContent)

  // 应用最小宽度和最大宽度限制
  const minWidth = column.minWidth || 50
  const maxWidth = column.maxWidth || 500
  const adjustedWidth = Math.max(minWidth, Math.min(maxWidth, calculatedWidth))

  // 更新列宽
  const columnIndex = tableColumns.value.findIndex(col => col.key === columnKey)
  if (columnIndex > -1) {
    tableColumns.value[columnIndex].width = adjustedWidth
    emit('column-resize', { key: columnKey, width: adjustedWidth })
  }
}

// 键盘事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Shift') {
    isShiftKeyPressed.value = true

    // 更新指示线样式
    const resizeGuide = document.getElementById('column-resize-guide')
    if (resizeGuide && props.multiColumnResize)
      resizeGuide.classList.add('multi-column-resize')
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Shift') {
    isShiftKeyPressed.value = false

    // 更新指示线样式
    const resizeGuide = document.getElementById('column-resize-guide')
    if (resizeGuide)
      resizeGuide.classList.remove('multi-column-resize')
  }
}

// 欄位寬度調整
const handleColumnResizeStart = (event: MouseEvent, columnKey: string, currentWidth: number) => {
  if (!props.columnResizable)
    return

  // 阻止事件冒泡，避免触发其他事件
  event.stopPropagation()
  event.preventDefault()

  // 初始化Shift键状态
  isShiftKeyPressed.value = event.shiftKey

  // 检测双击事件 - 自动调整列宽
  if (event.detail === 2) {
    // 自动调整列宽
    autoAdjustColumnWidth(columnKey)

    return
  }

  document.body.classList.add('resizing-active')

  resizingColumn.value = columnKey
  startX.value = event.clientX
  startWidth.value = currentWidth || 100

  // 创建或显示调整指示线
  let resizeGuide = document.getElementById('column-resize-guide')
  if (!resizeGuide) {
    resizeGuide = document.createElement('div')
    resizeGuide.id = 'column-resize-guide'
    resizeGuide.className = 'column-resize-guide'
    document.querySelector('.table-wrapper')?.appendChild(resizeGuide)
  }

  // 设置指示线位置
  const tableRect = document.querySelector('.table-wrapper')?.getBoundingClientRect()
  if (tableRect) {
    const leftPosition = event.clientX - tableRect.left

    resizeGuide.style.left = `${leftPosition}px`
    resizeGuide.style.display = 'block'
    resizeGuide.style.height = `${tableRect.height}px`

    // 如果按住Shift键，显示多列调整指示
    resizeGuide.classList.toggle('multi-column-resize', isShiftKeyPressed.value && props.multiColumnResize)
  }

  document.addEventListener('mousemove', handleColumnResizeMove)
  document.addEventListener('mouseup', handleColumnResizeEnd)

  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
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
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
})
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
          class="fixed-width-table"
        >
          <thead>
            <tr>
              <!-- 拖曳图标列 -->
              <th
                v-if="rowDraggable"
                class="drag-handle-header"
                width="40"
              >
                <VIcon
                  icon="ri-drag-move-line"
                  size="small"
                />
              </th>

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
                :style="{ width: column.width ? `${column.width}px` : 'auto', minWidth: column.width ? `${column.width}px` : '100px' }"
                class="column-header"
                :class="{
                  sortable: column.sortable && sortable,
                  sorted: sortBy === column.key,
                  desc: sortBy === column.key && sortDesc,
                  resizable: columnResizable,
                }"
                @dragover.prevent="columnDraggable && handleColumnDragOver($event)"
                @drop.prevent="columnDraggable && handleColumnDrop($event, column.key)"
                @click="column.sortable && sortable ? handleSort(column.key) : null"
              >
                <div class="column-header-content">
                  <div
                    v-if="column.draggable && columnDraggable"
                    class="column-drag-handle"
                    draggable="true"
                    @dragstart="handleColumnDragStart($event, column.key)"
                    @click.stop
                  >
                    <VIcon
                      icon="ri-drag-move-2-line"
                      size="small"
                    />
                  </div>
                  <div class="column-title">
                    {{ column.title }}
                  </div>
                  <VIcon
                    v-if="column.sortable && sortable && sortBy === column.key"
                    :icon="sortDesc ? 'ri-arrow-down-line' : 'ri-arrow-up-line'"
                    size="small"
                    class="sort-icon"
                  />
                </div>
                <div
                  v-if="columnResizable"
                  class="resize-handle"
                  @mousedown.stop="handleColumnResizeStart($event, column.key, column.width || 100)"
                >
                  <div class="resize-handle-indicator" />
                </div>
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
                  'expanded': isExpanded(item.id),
                  'row-dragging': draggedRowId === item.id,
                }"
                @dragover="handleRowDragOver"
                @drop="handleRowDrop($event, item.id)"
              >
                <!-- 拖曳图标单元格 -->
                <td
                  v-if="rowDraggable"
                  class="drag-handle-cell"
                >
                  <div
                    class="drag-handle"
                    draggable="true"
                    @dragstart="handleRowDragStart($event, item.id)"
                  >
                    <VIcon
                      icon="ri-drag-move-line"
                      size="small"
                    />
                  </div>
                </td>

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
                    :icon="isExpanded(item.id) ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
                    size="small"
                  />
                </td>

                <!-- 數據欄位 -->
                <td
                  v-for="column in visibleColumns"
                  :key="`${item.id}-${column.key}`"
                  class="data-cell"
                  :style="{ width: column.width ? `${column.width}px` : 'auto', minWidth: column.width ? `${column.width}px` : '100px' }"
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
                  :colspan="visibleColumns.length + (rowNumberVisible ? 1 : 0) + (expandable ? 1 : 0) + (rowDraggable ? 1 : 0)"
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
  position: relative;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 5%);
  inline-size: 100%;
  overflow-x: auto;
}

/* 固定宽度表格样式 */
.fixed-width-table {
  border-collapse: separate;
  border-spacing: 0;
  inline-size: auto;

  /* 修改为最小宽度100%，允许表格变宽 */
  min-inline-size: 100%;
  table-layout: fixed;
  white-space: nowrap;
}

.sticky-header th {
  position: sticky;
  z-index: 2;
  background-color: white;
  inset-block-start: 0;
}

.column-header {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s ease;
  user-select: none;
  white-space: nowrap;
}

/* 确保单元格不会随着调整列宽而变化大小 */
.data-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.column-header.column-drag-over {
  background-color: rgba(25, 118, 210, 10%);
  box-shadow: inset 0 -2px 0 var(--v-theme-primary, #1976d2);
}

.column-header-content {
  display: flex;
  align-items: center;
}

.column-drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  cursor: grab;
  margin-inline-end: 8px;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.column-drag-handle:hover {
  background-color: rgba(0, 0, 0, 5%);
  opacity: 1;
}

.column-drag-handle:active {
  background-color: rgba(0, 0, 0, 10%);
  cursor: grabbing;
  transform: scale(1.1);
}

.column-title {
  flex: 1;
}

.resize-handle {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  block-size: 100%;
  cursor: col-resize;
  inline-size: 10px;
  inset-block-start: 0;
  inset-inline-end: -5px;
  transition: background-color 0.15s ease;
}

.resize-handle-indicator {
  border-radius: 1px;
  background-color: rgba(0, 0, 0, 15%);
  block-size: 60%;
  inline-size: 2px;
  transition: background-color 0.15s ease, inline-size 0.15s ease;
}

.resize-handle:hover {
  background-color: rgba(0, 0, 0, 5%);
}

.resize-handle:hover .resize-handle-indicator {
  background-color: rgba(0, 0, 0, 40%);
  inline-size: 3px;
}

.resize-handle:active .resize-handle-indicator {
  background-color: var(--v-theme-primary, #1976d2);
  inline-size: 3px;
}

/* 添加双击提示 */
.resize-handle::after {
  position: absolute;
  content: '';
  font-size: 10px;
  inset-block-end: -15px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-5px);
  transition: opacity 0.3s, transform 0.3s;
  white-space: nowrap;
}

.resize-handle:hover::after {
  content: '双击自动调整, Shift拖动调整多列';
  opacity: 0.7;
  transform: translateY(0);
}

/* 列宽调整指示线 */
.column-resize-guide {
  position: absolute;
  z-index: 1000;
  display: none;
  background-color: var(--v-theme-primary, #1976d2);
  box-shadow: 0 0 4px rgba(25, 118, 210, 50%);
  inline-size: 2px;
  inset-block-start: 0;
  pointer-events: none;
}

/* 多列调整指示线样式 */
.column-resize-guide.multi-column-resize {
  background-color: #ff5722;
  box-shadow: 0 0 6px rgba(255, 87, 34, 50%);
  inline-size: 3px;
}

.column-resize-guide.multi-column-resize::after {
  position: absolute;
  border-radius: 4px;
  background-color: #ff5722;
  color: white;
  content: '多列调整';
  font-size: 12px;
  inset-block-start: -20px;
  inset-inline-start: 5px;
  padding-block: 2px;
  padding-inline: 6px;
  white-space: nowrap;
}

.resizing-active {
  cursor: col-resize;
  user-select: none;
}

.resizing-active * {
  cursor: col-resize !important;
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
.expand-header,
.drag-handle-cell,
.drag-handle-header {
  inline-size: 50px;
  text-align: center;
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 100%;
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
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

.row-dragging {
  opacity: 0.6;
  transition: transform 0.2s ease-in-out;
}

@keyframes row-move {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0);
  }
}

.data-row {
  position: relative;
  transition: all 0.3s ease;
}

.data-row.row-dragging {
  animation: row-move 0.3s ease-in-out;
}

/* 拖曳时突出显示目标元素 */
.column-drag-over::before {
  position: absolute;
  border-inline-start: 2px solid var(--v-theme-primary, #1976d2);
  content: '';
  inset-block: 0;
  inset-inline-start: 0;
}

/* 确保表格边框一致性 */
.VTable {
  border-collapse: separate;
  border-spacing: 0;
  inline-size: 100%;
}
</style>

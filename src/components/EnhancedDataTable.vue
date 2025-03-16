<script setup>
import { nextTick, reactive, ref } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:headers', 'update:items'])

// 表格设置
const dataTable = ref(null)
const itemsPerPage = ref(10)

// 列宽调整相关
const columnWidths = reactive({})
const isResizing = ref(false)
const resizingColumn = ref(null)
const startX = ref(0)
const startWidth = ref(0)
const resizePreview = ref(null)
const currentResizeWidth = ref(0)

// 单元格编辑相关
const editingCell = reactive({
  itemId: null,
  key: null,
  value: null,
})

// 添加排序相关状态
const sortBy = ref([])

// 计算排序后的项目
// const sortedItems = computed(() => {
//   // 如果没有排序，返回原始数据
//   if (!sortBy.value.length)
//     return props.items

//   // 复制数组以避免修改原始数据
//   const sorted = [...props.items]

//   // 根据排序规则排序
//   sorted.sort((a, b) => {
//     for (const sort of sortBy.value) {
//       const key = sort.key
//       const order = sort.order === 'asc' ? 1 : -1

//       if (a[key] < b[key])
//         return -1 * order
//       if (a[key] > b[key])
//         return 1 * order
//     }

//     return 0
//   })

//   return sorted
// })

// 计算当前是否正在编辑某个单元格
const isEditing = (item, key) => {
  return editingCell.itemId === item.id && editingCell.key === key
}

// 处理列宽调整
const handleColumnResize = event => {
  if (!isResizing.value)
    return

  const width = startWidth.value + (event.clientX - startX.value)
  if (width >= 50) { // 最小宽度限制
    currentResizeWidth.value = width

    // 更新预览位置
    if (resizePreview.value) {
      const column = document.querySelector(`th[data-key="${resizingColumn.value}"]`)
      const tableLeft = document.querySelector('.enhanced-data-table table').getBoundingClientRect().left
      const newLeft = column.getBoundingClientRect().left - tableLeft + width

      resizePreview.value.style.left = `${newLeft}px`

      // 实时更新列宽（添加动画效果）
      column.style.width = `${width}px`
      column.style.minWidth = `${width}px`
    }
  }
}

// 停止列宽调整
const stopColumnResize = () => {
  if (isResizing.value) {
    // 保存最终宽度
    columnWidths[resizingColumn.value] = `${currentResizeWidth.value}px`

    // 移除预览元素
    if (resizePreview.value && resizePreview.value.parentNode) {
      resizePreview.value.parentNode.removeChild(resizePreview.value)
      resizePreview.value = null
    }

    isResizing.value = false
    document.removeEventListener('mousemove', handleColumnResize)
    document.removeEventListener('mouseup', stopColumnResize)
  }
}

// 开始调整列宽
const startColumnResize = (event, columnKey) => {
  isResizing.value = true
  resizingColumn.value = columnKey
  startX.value = event.clientX

  // 获取当前列的宽度
  const column = document.querySelector(`th[data-key="${columnKey}"]`)

  startWidth.value = column ? column.offsetWidth : 100
  currentResizeWidth.value = startWidth.value

  // 创建调整预览元素
  resizePreview.value = document.createElement('div')
  resizePreview.value.className = 'resize-preview'
  resizePreview.value.style.height = `${document.querySelector('.enhanced-data-table table').offsetHeight}px`
  resizePreview.value.style.top = `${column.offsetTop}px`
  resizePreview.value.style.left = `${column.offsetLeft + column.offsetWidth}px`
  document.querySelector('.enhanced-data-table').appendChild(resizePreview.value)

  // 添加全局事件监听
  document.addEventListener('mousemove', handleColumnResize)
  document.addEventListener('mouseup', stopColumnResize)
  event.preventDefault()
}

// 拖曳相关状态
const draggedRowIndex = ref(null)
const draggedColumnIndex = ref(null)
const dragOverRowIndex = ref(null)
const dragOverColumnIndex = ref(null)
const dragDirection = ref(null) // 'before' 或 'after'
const draggedHeaderEl = ref(null)

// 重置拖曳状态
const resetDragState = () => {
  // 重置所有拖曳状态
  draggedColumnIndex.value = null
  dragOverColumnIndex.value = null
  draggedRowIndex.value = null
  dragOverRowIndex.value = null
  dragDirection.value = null

  // 移除所有拖曳相关的类
  document.querySelectorAll('th').forEach(el => {
    el.classList.remove('column-dragging', 'column-dragover', 'column-dragover-before', 'column-dragover-after')
  })

  document.querySelectorAll('tr').forEach(el => {
    el.classList.remove('row-dragging', 'row-dragover', 'row-dragover-before', 'row-dragover-after')
  })
}

// 行拖曳相关
const dragStartRow = (event, index) => {
  draggedRowIndex.value = index
  event.dataTransfer.setData('rowIndex', index)

  // 设置拖曳效果
  const row = event.currentTarget
  const rowRect = row.getBoundingClientRect()
  const dragImage = row.cloneNode(true)

  // 设置克隆元素的样式
  dragImage.style.position = 'absolute'
  dragImage.style.top = '-1000px'
  dragImage.style.opacity = '0.8'
  dragImage.style.width = `${rowRect.width}px`
  document.body.appendChild(dragImage)

  event.dataTransfer.setDragImage(dragImage, 20, 20)

  // 延迟移除拖曳图像元素
  setTimeout(() => {
    document.body.removeChild(dragImage)
  }, 0)

  event.dataTransfer.effectAllowed = 'move'
}

const dragOverRow = (event, index) => {
  event.preventDefault()

  if (draggedRowIndex.value === index)
    return

  dragOverRowIndex.value = index

  // 确定拖曳方向（在目标行的上方或下方）
  const rect = event.currentTarget.getBoundingClientRect()
  const y = event.clientY - rect.top

  dragDirection.value = y < rect.height / 2 ? 'before' : 'after'
}

const dragLeaveRow = () => {
  // 可选：在拖曳离开时重置
}

// 修改行拖曳相关函数，确保拖曳后重新计算序号
const dropRow = (event, targetIndex) => {
  const sourceIndex = Number.parseInt(event.dataTransfer.getData('rowIndex'))
  if (sourceIndex === targetIndex)
    return

  // 重新排序数据行
  const newItems = [...props.items]
  const movedItem = newItems.splice(sourceIndex, 1)[0]

  newItems.splice(targetIndex, 0, movedItem)

  emit('update:items', newItems)

  // 重置拖曳状态
  draggedRowIndex.value = null
  dragOverRowIndex.value = null

  // 强制更新显示序号
  nextTick(() => {
    // 这里可以添加额外的逻辑确保序号更新
  })
}

// 列拖曳相关
const dragStartColumn = (event, index) => {
  // 确保只有点击拖曳图标时才能拖曳
  const target = event.target
  if (!target.closest('.drag-handle')) {
    event.preventDefault()

    return false
  }

  draggedColumnIndex.value = index
  event.dataTransfer.setData('columnIndex', index.toString())

  // 获取当前表头元素
  const headerEl = event.currentTarget.closest('th')

  draggedHeaderEl.value = headerEl

  // 创建自定义拖曳图像
  const dragImage = headerEl.cloneNode(true)

  dragImage.style.width = `${headerEl.offsetWidth}px`
  dragImage.style.height = `${headerEl.offsetHeight}px`
  dragImage.style.background = '#f5f5f5'
  dragImage.style.border = '1px solid #ddd'
  dragImage.style.borderRadius = '4px'
  dragImage.style.opacity = '0.8'
  dragImage.style.position = 'absolute'
  dragImage.style.top = '-1000px'
  dragImage.style.left = '-1000px'
  document.body.appendChild(dragImage)

  event.dataTransfer.setDragImage(dragImage, 20, 20)

  // 延迟移除拖曳图像元素
  setTimeout(() => {
    document.body.removeChild(dragImage)
  }, 0)

  // 添加拖曳效果
  headerEl.classList.add('column-dragging')
  event.dataTransfer.effectAllowed = 'move'
}

const dragOverColumn = (event, index) => {
  event.preventDefault()

  if (draggedColumnIndex.value === index || draggedColumnIndex.value === null)
    return

  dragOverColumnIndex.value = index

  // 确定拖曳方向
  const headerEl = event.currentTarget.closest('th')
  const rect = headerEl.getBoundingClientRect()
  const x = event.clientX - rect.left

  dragDirection.value = x < rect.width / 2 ? 'before' : 'after'

  // 更新视觉提示
  document.querySelectorAll('th').forEach(el => {
    el.classList.remove('column-dragover-before', 'column-dragover-after')
  })

  headerEl.classList.add(`column-dragover-${dragDirection.value}`)
}

const dragLeaveColumn = event => {
  // 移除拖曳提示
  event.currentTarget.closest('th').classList.remove('column-dragover-before', 'column-dragover-after')
}

const dropColumn = (event, targetIndex) => {
  event.preventDefault()

  const sourceIndex = Number.parseInt(event.dataTransfer.getData('columnIndex'))
  if (sourceIndex === targetIndex || Number.isNaN(sourceIndex))
    return

  // 根据拖曳方向调整目标索引
  let finalTargetIndex = targetIndex
  if (dragDirection.value === 'after' && sourceIndex < targetIndex)
    finalTargetIndex += 1

  else if (dragDirection.value === 'before' && sourceIndex > targetIndex)
    finalTargetIndex -= 0

  else if (dragDirection.value === 'after' && sourceIndex > targetIndex)
    finalTargetIndex += 0

  else if (dragDirection.value === 'before' && sourceIndex < targetIndex)
    finalTargetIndex -= 1

  // 重新排序表头
  const newHeaders = [...props.headers]
  const movedHeader = newHeaders.splice(sourceIndex, 1)[0]

  // 确保目标索引有效
  finalTargetIndex = Math.max(0, Math.min(finalTargetIndex, newHeaders.length))
  newHeaders.splice(finalTargetIndex, 0, movedHeader)

  emit('update:headers', newHeaders)

  // 重置拖曳状态
  resetDragState()
}

const dragEnd = () => {
  resetDragState()
}

// 单元格编辑相关
const startCellEdit = (item, key) => {
  // 如果是拖曳图标或调整宽度区域，不进入编辑模式
  if (event.target.closest('.drag-handle') || event.target.closest('.column-resizer'))
    return

  // 如果是不可编辑的列，不进入编辑模式
  const nonEditableColumns = ['index'] // 可以根据需要添加其他不可编辑的列
  if (nonEditableColumns.includes(key))
    return

  editingCell.itemId = item.id
  editingCell.key = key
  editingCell.value = item[key]

  nextTick(() => {
    // 自动聚焦到输入框
    const input = document.querySelector('.enhanced-data-table input')
    if (input)
      input.focus()
  })
}

const finishCellEdit = () => {
  if (editingCell.itemId !== null) {
    // 更新数据
    const newItems = props.items.map(item => {
      if (item.id === editingCell.itemId) {
        return {
          ...item,
          [editingCell.key]: editingCell.value,
        }
      }

      return item
    })

    emit('update:items', newItems)

    // 重置编辑状态
    editingCell.itemId = null
    editingCell.key = null
    editingCell.value = null
  }
}

const cancelCellEdit = () => {
  // 取消编辑，不保存更改
  editingCell.itemId = null
  editingCell.key = null
  editingCell.value = null
}

// 处理排序变化
const handleSortChange = newSortBy => {
  sortBy.value = newSortBy
}
</script>

<template>
  <div class="enhanced-data-table">
    <VDataTable
      ref="dataTable"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="items"
      :loading="loading"
      class="elevation-1"
      @update:sort-by="handleSortChange"
    >
      <!-- 自定义表头，支持拖曳和调整宽度 -->
      <template #headers="{ columns }">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            :data-key="column.key"
            :data-column-index="index"
            :style="{ width: columnWidths[column.key] || 'auto' }"
          >
            <div class="d-flex align-center justify-space-between">
              <span>{{ column.title }}</span>
              <div class="d-flex align-center">
                <div
                  class="drag-handle"
                  draggable="true"
                  @dragstart="dragStartColumn($event, index)"
                  @dragover="dragOverColumn($event, index)"
                  @dragleave="dragLeaveColumn($event)"
                  @dragend="dragEnd"
                  @drop="dropColumn($event, index)"
                >
                  <VIcon
                    size="small"
                    class="ms-1"
                  >
                    ri-draggable
                  </VIcon>
                </div>
                <div
                  class="column-resizer"
                  @mousedown.stop="startColumnResize($event, column.key)"
                />
              </div>
            </div>
          </th>
        </tr>
      </template>

      <!-- 自定义行，支持拖曳和单元格编辑 -->
      <template #item="{ item, index, columns }">
        <tr
          :key="item.id"
          :class="{
            'row-dragging': draggedRowIndex === index,
            'row-dragover': dragOverRowIndex === index,
            'row-dragover-before': dragOverRowIndex === index && dragDirection === 'before',
            'row-dragover-after': dragOverRowIndex === index && dragDirection === 'after',
          }"
          draggable="true"
          @dragstart="dragStartRow($event, index)"
          @dragover="dragOverRow($event, index)"
          @dragleave="dragLeaveRow"
          @dragend="dragEnd"
          @drop="dropRow($event, index)"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="{ 'cell-editable': !['index'].includes(column.key) }"
            @click="startCellEdit(item, column.key)"
          >
            <div v-if="isEditing(item, column.key)">
              <VTextField
                v-model="editingCell.value"
                density="compact"
                variant="outlined"
                hide-details
                autofocus
                @blur="finishCellEdit"
                @keyup.enter="finishCellEdit"
                @keyup.esc="cancelCellEdit"
              />
            </div>
            <div v-else>
              <!-- 显示序号或实际数据 -->
              <template v-if="column.key === 'index'">
                {{ index + 1 }}
              </template>
              <template v-else>
                {{ item[column.key] }}
              </template>
            </div>
          </td>
        </tr>
      </template>
    </VDataTable>
  </div>
</template>

<style scoped>
.enhanced-data-table {
  position: relative;
}

.column-resizer {
  position: absolute;
  z-index: 10;
  background-color: transparent;
  block-size: 100%;
  cursor: col-resize;
  inline-size: 10px; /* 增加宽度使更容易点击 */
  inset-block-start: 0;
  inset-inline-end: -5px; /* 调整位置使拖曳区域更明显 */
}

.column-resizer:hover {
  background-color: rgba(33, 150, 243, 30%);
}

.column-resizing .column-resizer {
  background-color: rgba(33, 150, 243, 50%);
}

.resize-preview {
  position: absolute;
  z-index: 100;
  background-color: #2196F3;
  box-shadow: 0 0 4px rgba(33, 150, 243, 60%);
  inline-size: 2px;
  pointer-events: none;
  transition: inset-inline-start 0.05s ease-out;
}

th {
  position: relative;
  transition: inline-size 0.05s ease-out, background-color 0.2s;
  user-select: none;
}

/* 添加调整宽度时的视觉反馈 */
.column-resizing {
  background-color: rgba(33, 150, 243, 10%);
}

tr[draggable="true"] {
  cursor: move;
}

tr[draggable="true"]:hover {
  background-color: rgba(0, 0, 0, 3%);
}

/* 拖曳动画相关样式 */
.column-dragging {
  background-color: rgba(0, 120, 255, 5%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 20%);
  opacity: 0.4;
}

.column-dragover-before {
  position: relative;
  border-inline-start: 3px solid #2196F3;
}

.column-dragover-before::before {
  position: absolute;
  background-color: #2196F3;
  block-size: 100%;
  box-shadow: 0 0 4px rgba(33, 150, 243, 60%);
  content: '';
  inline-size: 3px;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.column-dragover-after {
  position: relative;
  border-inline-end: 3px solid #2196F3;
}

.column-dragover-after::after {
  position: absolute;
  background-color: #2196F3;
  block-size: 100%;
  box-shadow: 0 0 4px rgba(33, 150, 243, 60%);
  content: '';
  inline-size: 3px;
  inset-block-start: 0;
  inset-inline-end: 0;
}

.row-dragging {
  background-color: rgba(0, 120, 255, 5%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 20%);
  opacity: 0.4;
}

.row-dragover-before {
  border-block-start: 3px solid #2196F3;
}

.row-dragover-after {
  border-block-end: 3px solid #2196F3;
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  cursor: grab;
  margin-inline-end: 4px;
  transition: background-color 0.2s;
}

.drag-handle:hover {
  background-color: rgba(0, 0, 0, 5%);
}

.drag-handle:active {
  background-color: rgba(0, 0, 0, 10%);
  cursor: grabbing;
}

.cell-editable {
  cursor: text;
}

.cell-editable:hover {
  background-color: rgba(33, 150, 243, 5%);
}
</style>

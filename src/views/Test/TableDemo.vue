<script setup lang="ts">
import { ref } from 'vue'
import EnhancedDataTable from '@/components/EnhancedDataTable.vue'
import AdvanceDataTable from '@/components/AdvanceDataTable.vue'

// EnhancedDataTable 的数据
const headers = ref([
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Project Name', key: 'name', sortable: true },
  { title: 'Description', key: 'description', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Created Date', key: 'createdAt', sortable: true },
  { title: 'Priority', key: 'priority', sortable: true },
  { title: 'Budget (USD)', key: 'budget', sortable: true },
  { title: 'Progress (%)', key: 'progress', sortable: true },
  { title: 'Active', key: 'active', sortable: true },
])

const items = ref([
  { id: 1, name: 'Project Alpha', description: 'Description of Project Alpha', status: 'In Progress', createdAt: '2024-02-01', priority: 'High', budget: 50000, progress: 60, active: true },
  { id: 2, name: 'Project Beta', description: 'Description of Project Beta', status: 'Completed', createdAt: '2024-01-15', priority: 'Medium', budget: 75000, progress: 100, active: false },
  { id: 3, name: 'Project Gamma', description: 'Description of Project Gamma', status: 'Pending', createdAt: '2024-03-01', priority: 'Low', budget: 30000, progress: 20, active: true },
  { id: 4, name: 'Project Delta', description: 'Description of Project Delta', status: 'In Progress', createdAt: '2024-02-20', priority: 'High', budget: 90000, progress: 45, active: true },
  { id: 5, name: 'Project Epsilon', description: 'Description of Project Epsilon', status: 'Completed', createdAt: '2024-01-05', priority: 'Medium', budget: 60000, progress: 100, active: false },
])

// AdvanceDataTable 的数据
const advanceColumns = ref([
  { title: 'ID', key: 'id', sortable: false, width: 80 },
  { title: '项目名称', key: 'name', sortable: false, editable: true },
  { title: '描述', key: 'description', sortable: false, editable: true },
  { title: '状态', key: 'status', sortable: false, editable: true },
  { title: '创建日期', key: 'createdAt', sortable: false },
  { title: '优先级', key: 'priority', sortable: false, editable: true },
  { title: '预算 (USD)', key: 'budget', sortable: false, editable: true },
  { title: '进度 (%)', key: 'progress', sortable: false, editable: true },
  { title: '活跃状态', key: 'active', sortable: false, editable: true },
])

const advanceItems = ref([...items.value])

const loading = ref(false)

// AdvanceDataTable 的事件处理
const handleSort = (sortInfo: { key: string; direction: 'asc' | 'desc' }) => {
  console.log('排序信息:', sortInfo)
}

const handleRowClick = (info: { rowId: number | string; key: string; value: any }) => {
  console.log('行点击:', info)
}

const handleRowEdit = (info: { rowId: number | string; key: string; value: any; row: any }) => {
  console.log('单元格编辑:', info)
}
</script>

<template>
  <div class="pa-4">
    <h2 class="mb-4">
      EnhancedDataTable 示例
    </h2>
    <EnhancedDataTable
      v-model:headers="headers"
      v-model:items="items"
      :loading="loading"
    />

    <h2 class="mb-4 mt-8">
      AdvanceDataTable 示例
    </h2>
    <AdvanceDataTable
      :columns="advanceColumns"
      :items="advanceItems"
      row-number-visible
      row-draggable
      column-draggable
      column-resizable
      sortable
      expandable
      editable-on-click
      header-sticky
      @sort="handleSort"
      @row-click="handleRowClick"
      @row-edit="handleRowEdit"
    />
  </div>
</template>

<style scoped>
.pa-4 {
  padding: 1rem;
}

.mb-4 {
  margin-block-end: 1rem;
}

.mt-8 {
  margin-block-start: 2rem;
}
</style>

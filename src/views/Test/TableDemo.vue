<script setup>
import { ref } from 'vue'
import EnhancedDataTable from '@/components/EnhancedDataTable.vue'

const headers = ref([
  { title: '编号', key: 'id', sortable: true },
  { title: '名称', key: 'name', sortable: true },
  { title: '描述', key: 'description', sortable: false },
  { title: '状态', key: 'status', sortable: true },
  { title: '创建日期', key: 'createdAt', sortable: true },
])

const items = ref([
  { id: 1, name: '项目 A', description: '这是项目 A 的描述', status: '进行中', createdAt: '2023-01-01' },
  { id: 2, name: '项目 B', description: '这是项目 B 的描述', status: '已完成', createdAt: '2023-01-15' },
  { id: 3, name: '项目 C', description: '这是项目 C 的描述', status: '待处理', createdAt: '2023-02-01' },
  { id: 4, name: '项目 D', description: '这是项目 D 的描述', status: '进行中', createdAt: '2023-02-15' },
  { id: 5, name: '项目 E', description: '这是项目 E 的描述', status: '已完成', createdAt: '2023-03-01' },
])

const loading = ref(false)
</script>

<template>
  <div>
    <EnhancedDataTable
      v-model:headers="headers"
      v-model:items="items"
      :loading="loading"
    />
  </div>
</template>

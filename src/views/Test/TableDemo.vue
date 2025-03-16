<script setup>
import { ref } from 'vue'
import EnhancedDataTable from '@/components/EnhancedDataTable.vue'

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

<script lang="ts" setup>
import { computed, ref } from 'vue'

const search = ref({
  machine: null,
  option: null,
  owner: null,
})

const machines = ref([
  { title: 'Laser Cutter', value: 1 },
  { title: '3D Printer', value: 2 },
  { title: 'CNC Machine', value: 3 },
])

const options = ref([
  { title: 'High Precision', value: 'high_precision' },
  { title: 'Energy Saving', value: 'energy_saving' },
  { title: 'Fast Mode', value: 'fast_mode' },
])

const owners = ref([
  { title: 'Alice', value: 'alice' },
  { title: 'Bob', value: 'bob' },
  { title: 'Charlie', value: 'charlie' },
])

const headers = ref([
  { title: 'ID', key: 'id', value: 'id', align: 'end' }, // 添加 value: 'id'
  { title: 'Name', key: 'name', value: 'name', align: 'start' }, // 添加 value: 'name'
  { title: 'Category', key: 'category', value: 'category', align: 'start' }, // 添加 value: 'category'
  { title: 'Quantity', key: 'quantity', value: 'quantity', align: 'end' },
  { title: 'Price', key: 'price', value: 'price', align: 'end' },
  { title: 'Date', key: 'date', value: 'date', align: 'start' },
  { title: 'Status', key: 'status', value: 'status', align: 'start' },
  { title: 'Supplier', key: 'supplier', value: 'supplier', align: 'start' },
])

const tableItems = ref([
  { id: 1, name: 'Laser Cutter', category: 'Machinery', quantity: 5, price: 50000, date: '2024-02-15', status: 'Active', supplier: 'TechCorp' },
  { id: 2, name: '3D Printer', category: 'Machinery', quantity: 8, price: 25000, date: '2024-02-14', status: 'Pending', supplier: 'MakerLab' },
  { id: 3, name: 'CNC Machine', category: 'Machinery', quantity: 3, price: 75000, date: '2024-02-13', status: 'Inactive', supplier: 'IndustrialTech' },
  { id: 4, name: 'Robot Arm', category: 'Components', quantity: 14, price: 94583, date: '2024-02-28', status: 'Inactive', supplier: 'RoboAutomation' },
  { id: 5, name: 'Logic Analyzer', category: 'Tools', quantity: 18, price: 53577, date: '2024-02-25', status: 'Shipped', supplier: 'IndustrialTech' },
  { id: 6, name: 'Pick and Place Machine', category: 'Software', quantity: 11, price: 47525, date: '2024-03-01', status: 'Pending', supplier: 'PrecisionParts' },
  { id: 7, name: 'Spectrum Analyzer', category: 'Electronics', quantity: 19, price: 79469, date: '2024-02-17', status: 'Ordered', supplier: 'FabricaTech' },
  { id: 8, name: 'Wave Soldering Machine', category: 'Electronics', quantity: 7, price: 64852, date: '2024-02-22', status: 'Shipped', supplier: 'MakerLab' },
  { id: 9, name: 'Milling Machine', category: 'Components', quantity: 12, price: 91740, date: '2024-02-11', status: 'Ordered', supplier: 'PrecisionParts' },
  { id: 10, name: 'Grinder', category: 'Software', quantity: 14, price: 29875, date: '2024-02-25', status: 'Received', supplier: 'InnovaTools' },
  { id: 11, name: 'Power Supply', category: 'Electronics', quantity: 15, price: 33590, date: '2024-02-15', status: 'Received', supplier: 'CircuitSolutions' },
  { id: 12, name: 'Lathe', category: 'Components', quantity: 16, price: 35373, date: '2024-02-13', status: 'Shipped', supplier: 'GlobalMachinery' },
  { id: 13, name: 'Motor Driver', category: 'Tools', quantity: 8, price: 63946, date: '2024-02-21', status: 'Inactive', supplier: 'PrecisionParts' },
  { id: 14, name: 'PLC Controller', category: 'Machinery', quantity: 1, price: 84253, date: '2024-02-26', status: 'Pending', supplier: 'MakerLab' },
  { id: 15, name: 'Soldering Iron', category: 'Software', quantity: 13, price: 36845, date: '2024-02-16', status: 'Received', supplier: 'RoboAutomation' },
])

const filteredItems = computed(() => {
  return tableItems.value.filter(item => {
    return (
      (!search.value.machine || item.name.includes(machines.value.find(m => m.value === search.value.machine)?.title || ''))
      && (!search.value.option || item.name.includes(options.value.find(o => o.value === search.value.option)?.title || ''))
      && (!search.value.owner || item.supplier.includes(owners.value.find(o => o.value === search.value.owner)?.title || ''))
    )
  })
})

const exportData = () => {
  console.log('Exporting:', filteredItems.value)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle>eqp-option</VCardTitle>
        </VCardItem>
        <VCardText>
          <VRow>
            <VCol cols="4">
              <VAutocomplete
                v-model="search.machine"
                :items="machines"
                label="Machine"
              />
            </VCol>
            <VCol cols="4">
              <VAutocomplete
                v-model="search.option"
                :items="options"
                label="Option"
              />
            </VCol>
            <VCol cols="4">
              <VAutocomplete
                v-model="search.owner"
                :items="owners"
                label="Owner"
              />
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VCardText class="d-flex flex-wrap gap-4">
          <VBtn @click="exportData">
            Export
          </VBtn>
          <VSpacer />
          <VBtn>Search</VBtn>
          <VBtn>Add</VBtn>
        </VCardText>
        <VDataTable
          :headers="headers"
          :items="filteredItems"
          show-select
        >
          <template #item.price="{ item }">
            {{ new Intl.NumberFormat().format(item.price) }}
          </template>
          <template #item.status="{ item }">
            <VChip
              size="small"
              :color="item.status === 'Active' ? 'success' : item.status === 'Pending' ? 'warning' : 'secondary'"
            >
              {{ item.status }}
            </VChip>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
const values = ref('')

const items = ref([
  {
    title: 'Lan',
    value: 1,
  },
  {
    title: 'Vera',
    value: 2,
  },
  {
    title: 'Tivona',
    value: 3,
  },
])

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Price', key: 'price' },
  { title: 'Date', key: 'date' },
])

const tableItems = ref([
  { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10, price: 30000, date: '2024-02-15' },
  { id: 2, name: 'Smartphone', category: 'Electronics', quantity: 25, price: 15000, date: '2024-02-14' },
  { id: 3, name: 'Wireless Earbuds', category: 'Accessories', quantity: 50, price: 5000, date: '2024-02-13' },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    category: 'Computer Peripherals',
    quantity: 15,
    price: 3500,
    date: '2024-02-12',
  },
  { id: 5, name: 'Gaming Mouse', category: 'Computer Peripherals', quantity: 20, price: 2000, date: '2024-02-11' },
  { id: 6, name: 'Monitor', category: 'Electronics', quantity: 8, price: 12000, date: '2024-02-10' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Audio Equipment', quantity: 18, price: 7000, date: '2024-02-09' },
  { id: 8, name: 'Power Bank', category: 'Accessories', quantity: 40, price: 1200, date: '2024-02-08' },
  { id: 9, name: 'Camera', category: 'Photography Equipment', quantity: 5, price: 45000, date: '2024-02-07' },
  { id: 10, name: 'Smartwatch', category: 'Wearable Devices', quantity: 12, price: 8000, date: '2024-02-06' },
])
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
                v-model="values"
                :items="items"
                label="Machine"
              />
            </VCol>
            <VCol cols="4">
              <VAutocomplete
                v-model="values"
                :items="items"
                label="Option"
              />
            </VCol>
            <VCol cols="4">
              <VAutocomplete
                v-model="values"
                :items="items"
                label="Owner"
              />
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VCardText class="d-flex flex-wrap gap-4">
          <VBtn>Export</VBtn>
          <VSpacer />

          <VBtn>Search</VBtn>
          <VBtn>Add</VBtn>
        </VCardText>
        <VDataTable
          :headers="headers"
          :items="tableItems"
          show-select
        />
      </VCard>
    </VCol>
  </VRow>
</template>

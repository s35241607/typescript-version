<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-item>
          <v-card-title>eqp-option</v-card-title>
        </v-card-item>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-autocomplete
                  v-model="values"
                  :items="items"
                  label="Machine"
                ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                  v-model="values"
                  :items="items"
                  label="Option"
                ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                  v-model="values"
                  :items="items"
                  label="Owner"
                ></v-autocomplete>
            </v-col>
            

          </v-row>
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-text class="d-flex flex-wrap gap-4">
          <v-btn >Export</v-btn>
          <v-spacer/>

          <v-btn >Search</v-btn>
          <v-btn >Add</v-btn>
        </v-card-text>
        <v-data-table :headers="headers" :items="table_items" show-select></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
const values = ref("")
const items = ref([{
  title: "Lan",
  value: 1
},{
  title: "Vera",
  value: 2
},{
  title: "Tivona",
  value: 3
}])

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Price', key: 'price' },
  { title: 'Date', key: 'date' },
]);

const table_items = ref([
  { id: 1, name: 'Laptop', category: 'Electronics', quantity: 10, price: 30000, date: '2024-02-15' },
  { id: 2, name: 'Smartphone', category: 'Electronics', quantity: 25, price: 15000, date: '2024-02-14' },
  { id: 3, name: 'Wireless Earbuds', category: 'Accessories', quantity: 50, price: 5000, date: '2024-02-13' },
  { id: 4, name: 'Mechanical Keyboard', category: 'Computer Peripherals', quantity: 15, price: 3500, date: '2024-02-12' },
  { id: 5, name: 'Gaming Mouse', category: 'Computer Peripherals', quantity: 20, price: 2000, date: '2024-02-11' },
  { id: 6, name: 'Monitor', category: 'Electronics', quantity: 8, price: 12000, date: '2024-02-10' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Audio Equipment', quantity: 18, price: 7000, date: '2024-02-09' },
  { id: 8, name: 'Power Bank', category: 'Accessories', quantity: 40, price: 1200, date: '2024-02-08' },
  { id: 9, name: 'Camera', category: 'Photography Equipment', quantity: 5, price: 45000, date: '2024-02-07' },
  { id: 10, name: 'Smartwatch', category: 'Wearable Devices', quantity: 12, price: 8000, date: '2024-02-06' },
]);

</script>

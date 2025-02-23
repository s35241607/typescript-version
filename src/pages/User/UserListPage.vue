<script lang="ts" setup>
import UserDataTable from '@/views/User/UserDataTable.vue'
import UserDropdown from '@/views/Dropdown/UserDropdown.vue'

const search = ref()

// const filteredItems = computed(() => {
//   return tableItems.value.filter(item => {
//     return (
//       (!search.value.machine || item.name.includes(machines.value.find(m => m.value === search.value.machine)?.title || ''))
//       && (!search.value.option || item.name.includes(options.value.find(o => o.value === search.value.option)?.title || ''))
//       && (!search.value.owner || item.supplier.includes(owners.value.find(o => o.value === search.value.owner)?.title || ''))
//     )
//   })
// })
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle>User List</VCardTitle>
        </VCardItem>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <UserDropdown v-model="search" />
            </VCol>
          </vrow>
        </VCardText>

        <VDivider />

        <VCardText class="d-flex flex-wrap gap-4">
          <VSpacer />
          <VBtn>Search</VBtn>
          <VBtn>Add</VBtn>
        </VCardText>
        <UserDataTable />
      </VCard>
    </VCol>
  </VRow>
</template>

<!-- Start of Selection -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { priceTableService } from '@/api/services/mockService'
import type { PriceTableResponse } from '@/api/services/mockService'
import { formatDate } from '@/utils/date'

const router = useRouter()

const items = ref<any[]>()

const headers: any = [
  { title: 'Order Number', key: 'orderNumber' },
  { title: 'Machine ID', key: 'machineId' },
  { title: 'Currency', key: 'currency' },
  { title: 'Contract Start Date', key: 'contractStartDate' },
  { title: 'Contract End Date', key: 'contractEndDate' },
]

const priceTableList = ref<PriceTableResponse[]>()

const goToTestPriceTable = (orderNumber: any) => {
  // 使用 router-name 來跳轉，並傳遞 params
  router.push({ name: 'TestPriceTableDetail', params: { id: orderNumber } })
}

onMounted(async () => {
  priceTableList.value = await priceTableService.getPriceTables()

  items.value = priceTableList.value.map(m => ({ title: m.orderNumber, value: m.id }))
})
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Price Table</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VAutocomplete :items="items" />
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
    <VDataTable
      :headers="headers"
      :items="priceTableList"
    >
      <template #item.orderNumber="{ item }">
        <VBtn
          color="primary"
          @click="goToTestPriceTable(item.id)"
        >
          {{ item.orderNumber }}
        </VBtn>
      </template>

      <template #item.contractStartDate="{ item }">
        <span>{{ formatDate(item.contractStartDate) }}</span>
      </template>
      <template #item.contractEndDate="{ item }">
        <span>{{ formatDate(item.contractEndDate) }}</span>
      </template>
    </VDataTable>
  </VCard>
</template>

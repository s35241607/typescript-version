<!-- Start of Selection -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { VDataTableServer } from 'vuetify/components/VDataTable'
import { priceTableService } from '@/api/services/mockService'
import BatchUploadPriceTableDialog from '@/views/PriceTable/BatchUploadPriceTableDialog.vue';
import type { PriceTableResponse } from '@/api/services/mockService'
import { formatDate } from '@/utils/date'
import { useApi } from '@/composables/useApi'

type ReadonlyHeaders = VDataTableServer['headers']

const headers: ReadonlyHeaders = [
  { title: 'Order Number', key: 'orderNumber', sortable: false },
  { title: 'Machine ID', key: 'machineId', sortable: false },
  { title: 'Currency', key: 'currency', sortable: false },
  { title: 'Contract Start Date', key: 'contractStartDate', sortable: false },
  { title: 'Contract End Date', key: 'contractEndDate', sortable: false },
]

const {
  data: priceTableList,
  loading,
  error,
  execute: fetchPriceTables,
} = useApi<PriceTableResponse[]>(
  priceTableService.getPriceTables,
  { initialData: [] },
)

const items = computed(() => {
  return priceTableList.value?.map(m => ({ title: m.orderNumber, value: m.id })) ?? []
})

onMounted(() => {
  fetchPriceTables()
})

const batchUploadDialogRef = ref<InstanceType<typeof BatchUploadPriceTableDialog> | null>(null);

const openBatchUploadDialog = () => {
  batchUploadDialogRef.value?.openDialog();
};

const handleUploadCompleted = () => {
  fetchPriceTables();
  // Optionally, add a snackbar confirmation here if needed,
  // but the dialog already shows one.
};
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Price Table</VCardTitle>
      <VSpacer />
      <VBtn color="primary" @click="openBatchUploadDialog">
        Batch Upload
      </VBtn>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VAutocomplete
            :items="items"
            :loading="loading"
            label="Select Order Number"
            item-title="title"
            item-value="value"
            clearable
          />
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
    <VDataTable
      :headers="headers"
      :items="priceTableList ?? []"
      :loading="loading"
      item-value="id"
    >
      <template #loading>
        <VSkeletonLoader type="table-row@5" />
      </template>
      <template #no-data>
        <div
          v-if="error"
          class="text-center pa-4 text-error"
        >
          Error loading data: {{ error }}
        </div>
        <div
          v-else
          class="text-center pa-4"
        >
          No data available.
        </div>
      </template>

      <template #item.orderNumber="{ item }">
        <RouterLink
          :to="{ name: 'TestPriceTableDetail', params: { id: item.id } }"
          class="text-primary text-decoration-none"
        >
          {{ item.orderNumber }}
        </RouterLink>
      </template>

      <template #item.contractStartDate="{ item }">
        <span>{{ formatDate(item.contractStartDate) }}</span>
      </template>
      <template #item.contractEndDate="{ item }">
        <span>{{ formatDate(item.contractEndDate) }}</span>
      </template>
    </VDataTable>
  </VCard>
  <BatchUploadPriceTableDialog ref="batchUploadDialogRef" @upload-completed="handleUploadCompleted" />
</template>

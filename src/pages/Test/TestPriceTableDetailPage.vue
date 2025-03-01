<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

import { VDateInput } from 'vuetify/labs/components'
import type { EqpOptionResponse, MachineResponse, PriceTableResponse } from '@/api/services/mockService'
import { eqpOptionService, machineService, priceTableService } from '@/api/services/mockService'

// 初始化 priceTable 時確保是空對象
const priceTable = ref<PriceTableResponse | undefined>({} as PriceTableResponse)
const machine = ref<MachineResponse | undefined>({} as MachineResponse)
const eqpOptions = ref<EqpOptionResponse[]>()
const eqpOptionMap: any = ref()

const dateRules = [
  // 檢查是否是有效的日期格式
  (v: string) => !!v || 'Date is required', // 確保有值
  (v: string) => {
    const date = new Date(v)

    return !Number.isNaN(date.getTime()) || 'Invalid date format'
  },
]

const priceTableItemHeaders = ref([
  { title: '', key: 'data-table-group' }, // 加上這個 key 來啟用展開功能
  { title: '', key: 'data-table-expand' }, // 加上這個 key 來啟用展開功能
  { title: 'Type', key: 'type' },

  // { title: 'Category', key: 'eqpOption.category' },
  { title: 'P/N', key: 'eqpOption.partNumber' },
  { title: 'Supplier P/N', key: 'eqpOption.supplierPartNumber' },
  { title: 'Description', key: 'eqpOption.description' },

  // { title: 'Supplement', key: 'eqpOption.supplement' },
  { title: 'Saving Base', key: 'savingBase' },
  { title: 'List Price', key: 'listPrice' },
  { title: 'Reference Price', key: 'referencePrice' },
])

const computedPriceTableItems = computed(() => {
  // 確保 priceTable.value?.items 存在，否則回傳空陣列
  return (priceTable.value?.items || []).map(item => {
    const eqpOption = eqpOptionMap.value[item.eqpOptionId] || {}

    return {
      ...item, // 保留原始 `priceTableItems` 的結構
      eqpOption,
    }
  })
})

onBeforeMount(async () => {
  const route = useRoute()
  const id = route.params.id

  priceTable.value = await priceTableService.getPriceTableById(Number(id))
  console.log(priceTable.value)

  machine.value = await machineService.getMachineById(Number(priceTable.value?.machineId))
  console.log(machine.value)

  eqpOptions.value = await eqpOptionService.getEqpOptions()

  // 轉換成 { eqpOptionId: eqpOption } 的快取映射
  eqpOptionMap.value = eqpOptions.value.reduce((map: any, option) => {
    map[option.id] = option

    return map
  }, {})
})
</script>

<template>
  <VCard class="d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6">
    <VCardText>
      <!-- 左側資訊 -->
      <div class="d-flex gap-2 align-center mb-2 flex-wrap">
        <h5 class="text-h5">
          {{ priceTable?.orderNumber }}
        </h5>
        <!-- 狀態 Chips -->
        <div class="d-flex gap-2">
          <VChip
            color="warning"
            variant="tonal"
            size="small"
          >
            {{ priceTable?.status }}
          </VChip>
          <VChip
            color="info"
            variant="tonal"
            size="small"
          >
            {{ priceTable?.currency }}
          </VChip>
        </div>
        <VSpacer />
        <VBtn size="small">
          Submit
        </VBtn>
        <!-- 刪除按鈕 -->
        <VBtn
          color="error"
          variant="outlined"
          size="small"
        >
          Delete
        </VBtn>
      </div>
      <VRow>
        <VCol
          cols="12"
          sm="3"
        >
          <div>
            Created By
          </div>
          <span class="text-high-emphasis font-weight-medium">{{ priceTable?.createdBy }}</span>
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <div>
            Created At
          </div>
          <span class="text-high-emphasis font-weight-medium">{{ priceTable?.createdAt?.toLocaleDateString('en-US', {
            weekday: 'short', // 顯示星期幾
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 12小時制 (AM/PM)
          }) }}</span>
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <div>
            Last Updated By
          </div>
          <span class="text-high-emphasis font-weight-medium">{{ priceTable?.updatedBy }}</span>
        </VCol>
        <VCol
          cols="12"
          sm="3"
        >
          <div>
            Last Updated At
          </div>
          <span class="text-high-emphasis font-weight-medium"> {{ priceTable?.updatedAt?.toLocaleDateString('en-US', {
            weekday: 'short', // 顯示星期幾
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 12小時制 (AM/PM)
          }) }}</span>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- Machine Information Section -->
  <VCard
    v-if="machine"
    class="mb-6"
  >
    <VCardItem>
      <VCardTitle>
        Machine Information
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <!-- Displaying Machine Information -->
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Maker</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.maker }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Model Name</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.modelName }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Process</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.process }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Location</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.location }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Status</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.status }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Serial Number</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.serialNumber }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Installation Date</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.installationDate }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Last Maintenance</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.lastMaintenance }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Warranty Period</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.warrantyPeriod }}</span>
        </VCol>
        <VCol
          cols="12"
          lg="3"
          md="3"
          sm="4"
        >
          <div>Production Capacity</div>
          <span class="text-high-emphasis font-weight-medium">{{ machine?.productionCapacity }}</span>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- Price Table Information -->
  <VCard
    v-if="priceTable"
    class="mb-6"
  >
    <VCardItem>
      <VCardTitle class="d-flex">
        <span>Price Table Information</span>
        <VSpacer />
        <VBtn size="small">
          Save
        </VBtn>
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <!-- 使用 TextField 來呈現 Currency -->
        <VCol
          cols="12"
          md="3"
          sm="6"
        >
          <VTextField
            v-model="priceTable.currency"
            label="Currency"
          />
        </VCol>
        <!-- 使用 AutoComplete 來呈現 Owner -->
        <VCol
          cols="12"
          md="3"
          sm="6"
        >
          <VTextField
            v-model="priceTable.ownerId"
            label="Owner"
          />
        </VCol>

        <!-- 使用 VDateInput 來呈現 Contract Start Date -->
        <VCol
          cols="12"
          md="3"
          sm="6"
        >
          <VDateInput
            v-model="priceTable.contractStartDate"
            label="Contract Start Date"
            :rules="dateRules"
          />
        </VCol>

        <!-- 使用 VDateInput 來呈現 Contract End Date -->
        <VCol
          cols="12"
          md="3"
          sm="6"
        >
          <VDateInput
            v-model="priceTable.contractEndDate"
            label="Contract End Date"
            :rules="dateRules"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="priceTable.remark"
            label="Remark"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          Attachment:
        </VCol>
      </VRow>
    </VCardText>
    <VCardItem>
      <VCardTitle>Price Table Items</VCardTitle>
    </VCardItem>
    <VCardText>
      <VDataTable
        :headers="priceTableItemHeaders"
        :items="computedPriceTableItems"
        show-expand
        :group-by="[{ key: 'eqpOption.category', order: 'asc' }]"
        item-grouping
      >
        <template #item.eqpOption.description="{ item }">
          {{ item.eqpOption.description }}
        </template>
        <!-- 自定義分組標題 -->
        <!--
          <template #data-table-group="{ item }">
          <tr>
          <td
          colspan="8"
          class="group-header"
          >
          <strong>{{ item.value }}</strong>
          </td>
          </tr>
          </template>
        -->
        <!-- 摺疊內容 -->
        <template #expanded-row="{ item }">
          <tr>
            <td colspan="8">
              <strong>Supplement:</strong> {{ item.eqpOption?.supplement || 'N/A' }}
            </td>
          </tr>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<style scoped>
.headline {
  font-weight: bold;
}

.v-data-table thead th,
.v-data-table tbody td {
  white-space: nowrap;
}

.v-table{
  white-space: nowrap;
}
</style>

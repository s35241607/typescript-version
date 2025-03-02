<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

import { VDateInput } from 'vuetify/labs/components'
import type { EqpOptionResponse, MachineResponse, PriceTableResponse } from '@/api/services/mockService'
import { eqpOptionService, machineService, priceTableService } from '@/api/services/mockService'

// 初始化 priceTable 時確保是空對象
const priceTable = ref<PriceTableResponse>({} as PriceTableResponse)
const machine = ref<MachineResponse | undefined>({} as MachineResponse)
const eqpOptions = ref<EqpOptionResponse[]>()
const eqpOptionMap: any = ref()

const editMode = ref<boolean>(false)

const dateRules = [
  // 檢查是否是有效的日期格式
  (v: string) => !!v || 'Date is required', // 確保有值
  (v: string) => {
    const date = new Date(v)

    return !Number.isNaN(date.getTime()) || 'Invalid date format'
  },
]

const priceTableItemHeaders = ref([
  // { title: '', key: 'actions' },
  { title: '', key: 'data-table-group' }, // 加上這個 key 來啟用展開功能
  { title: '#', key: 'sequence' },

  // { title: '', key: 'data-table-expand' }, // 加上這個 key 來啟用展開功能
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

const groupHeaders = ref<any>([])

const expanded = ref<any>([]) // 存放已展開的 rows

// 點擊 row 時展開/收起
const expandRow = (event: any, item: any) => {
  const index = expanded.value.indexOf(item.item.id)

  console.log('expand', index)
  if (index === -1)
    expanded.value.push(item.item.id)
  else
    expanded.value.splice(index, 1)
}

const deleteRow = (item: any) => {
  priceTable.value.items = priceTable.value.items.filter(i => i.id !== item.id)
}

const computedPriceTableItems = computed(() => {
  // 確保 priceTable.value?.items 存在，否則回傳空陣列
  return (priceTable.value?.items || []).map(item => {
    // 確保 eqpOptionMap.value 存在，避免讀取 undefined 屬性
    const eqpOption = item.eqpOptionId ? eqpOptionMap.value?.[item.eqpOptionId] ?? {} : {}

    return {
      ...item, // 保留原始 `priceTableItems` 的結構
      eqpOption,
    }
  })
})

onBeforeMount(async () => {
  const route = useRoute()
  const id = route.params.id
  const response = await priceTableService.getPriceTableById(Number(id))
  if (response)
    priceTable.value = response

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

onMounted(() => {
  Object.values(groupHeaders.value).forEach((header: any) => {
    header.toggleGroup(header.item)
  })
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
            v-model="priceTable.ownerId as number"
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
            v-model="priceTable.contractStartDate as Date"
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
            v-model="priceTable.contractEndDate as Date"
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
    <VCardText class="d-flex gap-2">
      <VBtn>Choose P/N</VBtn>
      <VBtn @click="editMode = !editMode">
        Edit
      </VBtn>
    </VCardText>
    <VCardText>
      <VDataTableVirtual
        v-model:expanded="expanded"
        :headers="priceTableItemHeaders"
        :items="computedPriceTableItems"
        show-expand
        :group-by="[{ key: 'eqpOption.category', order: 'asc' }]"
        item-grouping
        height="60vh"
        fixed-header
        @click:row.stop="expandRow"
      >
        <!-- 編輯按鈕 -->

        <template #item.data-table-group="{ item }">
          <VBtn
            size="small"
            variant="text"
            color="error"
            icon="ri-delete-bin-line"
            @click="deleteRow(item)"
          />
        </template>
        <template #item.sequence=" item ">
          {{ item.index }}
        </template>
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
        <template #item.savingBase="{ item }">
          <template v-if="editMode">
            <input
              v-model="item.savingBase"
              type="text"
              class="editable-input"
              placeholder="請輸入保存基準"
              style=" padding: 5px;border: 1px solid #007bff; border-radius: 4px; inline-size: 100%; text-align: end;"
            >
          </template>
          <template v-else>
            {{ item.savingBase }}
          </template>
        </template>
        <template #item.listPrice="{ item }">
          <template v-if="editMode">
            <input
              v-model="item.listPrice"
              type="text"
            >
          </template>
          <template v-else>
            {{ item.listPrice }}
          </template>
        </template>
        <template #item.referencePrice="{ item }">
          <template v-if="editMode">
            <input
              v-model="item.referencePrice"
              type="text"
            >
          </template>
          <template v-else>
            {{ item.referencePrice }}
          </template>
        </template>
      </VDataTableVirtual>
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

.v-table {
  white-space: nowrap;
}
</style>

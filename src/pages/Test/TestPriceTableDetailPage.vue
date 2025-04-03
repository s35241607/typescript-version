<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// import { VDateInput } from 'vuetify/labs/components'
import type { VDataTableServer } from 'vuetify/components/VDataTable'
import type { EqpOptionResponse, MachineResponse, PriceTableResponse } from '@/api/services/mockService'
import { eqpOptionService, machineService, priceTableService } from '@/api/services/mockService'
import FileUploader from '@/components/FileUploader.vue'
import { useApi } from '@/composables/useApi'

// 初始化 priceTable 時確保是空對象
const priceTable = ref<PriceTableResponse>({} as PriceTableResponse)
const machine = ref<MachineResponse | undefined>({} as MachineResponse)

// 附件相關
const attachments = ref<any[]>([])

// 處理附件更新
const handleAttachmentsUpdate = (newAttachments: any[]) => {
  attachments.value = newAttachments

  // 這裡可以添加其他邏輯，例如更新priceTable中的附件信息
}

// 處理上傳成功
const handleUploadSuccess = (fileData: any) => {
  console.log('文件上傳成功:', fileData)
}

// 處理上傳失敗
const handleUploadError = (error: any) => {
  console.error('文件上傳失敗:', error)
}

const editMode = ref<boolean>(false)

const dateRules = [
  // 檢查是否是有效的日期格式
  (v: string) => !!v || 'Date is required', // 確保有值
  (v: string) => {
    const date = new Date(v)

    return !Number.isNaN(date.getTime()) || 'Invalid date format'
  },
]

const priceTableItemHeaders = ref<VDataTableServer['headers']>([
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

const route = useRoute()
const priceTableId = Number(route.params.id)

// --- useApi for Price Table Detail ---
const {
  data: priceTableData, // Use priceTable directly
  loading: loadingPriceTable,
  error: errorPriceTable,
  execute: fetchPriceTable,
} = useApi<PriceTableResponse | undefined>( // Expect PriceTableResponse or undefined
  () => priceTableService.getPriceTableById(priceTableId), // Wrap the call in a function
  {
    // Initialize with an empty object structure might be safer for template access
    initialData: undefined, // Or {} as PriceTableResponse but need careful handling
  },
)

// --- useApi for EQP Options ---
const {
  data: eqpOptionsData, // Use eqpOptions directly
  loading: loadingEqpOptions,
  error: errorEqpOptions,
  execute: fetchEqpOptions,
} = useApi<EqpOptionResponse[]>( // Expect EqpOptionResponse array
  eqpOptionService.getEqpOptions,
  { initialData: [] }, // Start with empty array
)

// --- State for Machine Data (Fetched manually after price table) ---
const loadingMachine = ref(false)
const errorMachine = ref<unknown | null>(null)

// --- EQP Option Map (Computed) ---
const eqpOptionMapComputed = computed(() => {
  return (eqpOptionsData.value ?? []).reduce((map: Record<number, EqpOptionResponse>, option) => {
    map[option.id] = option

    return map
  }, {})
})

// --- Computed Price Table Items (Uses priceTable and eqpOptionMap) ---
const computedPriceTableItemsComputed = computed(() => {
  return (priceTableData.value?.items ?? []).map(item => ({
    ...item,
    eqpOption: eqpOptionMapComputed.value[item.eqpOptionId] ?? {},
  }))
})

// --- Watch for priceTable data to fetch machine data ---
watch(priceTableData, async newPriceTable => {
  if (newPriceTable?.machineId) {
    loadingMachine.value = true
    errorMachine.value = null
    try {
      machine.value = await machineService.getMachineById(newPriceTable.machineId)
    }
    catch (err) {
      console.error('Failed to fetch machine data:', err)
      errorMachine.value = err
    }
    finally {
      loadingMachine.value = false
    }
  }
  else {
    // Reset machine data if priceTable is invalid or lacks machineId
    machine.value = undefined
  }
}, { immediate: false }) // Don't run immediately, wait for fetchPriceTable result

// --- Fetch initial data ---
onBeforeMount(() => {
  fetchPriceTable() // Fetch price table details
  fetchEqpOptions() // Fetch EQP options
  // Machine data will be fetched via the watch effect
})

onMounted(() => {
  Object.values(groupHeaders.value).forEach((header: any) => {
    header.toggleGroup(header.item)
  })
})
</script>

<template>
  <!-- Loading/Error State for Price Table -->
  <VProgressLinear
    v-if="loadingPriceTable"
    indeterminate
    color="primary"
  />
  <VAlert
    v-if="errorPriceTable"
    type="error"
    class="mb-4"
  >
    Failed to load Price Table details: {{ errorPriceTable }}
  </VAlert>

  <template v-if="priceTableData">
    <VCard class="d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6">
      <VCardText>
        <!-- 左側資訊 -->
        <div class="d-flex gap-2 align-center mb-2 flex-wrap">
          <h5 class="text-h5">
            {{ priceTableData?.orderNumber ?? 'Loading...' }}
          </h5>
          <!-- 狀態 Chips -->
          <div class="d-flex gap-2">
            <VChip
              v-if="priceTableData?.status"
              color="warning"
              variant="tonal"
              size="small"
            >
              {{ priceTableData.status }}
            </VChip>
            <VChip
              v-if="priceTableData?.currency"
              color="info"
              variant="tonal"
              size="small"
            >
              {{ priceTableData.currency }}
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
            <span class="text-high-emphasis font-weight-medium">{{ priceTableData?.createdBy ?? '...' }}</span>
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <div>
              Created At
            </div>
            <span class="text-high-emphasis font-weight-medium">
              {{ priceTableData?.createdAt ? new Date(priceTableData.createdAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : '...' }}
            </span>
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <div>
              Last Updated By
            </div>
            <span class="text-high-emphasis font-weight-medium">{{ priceTableData?.updatedBy ?? '...' }}</span>
          </VCol>
          <VCol
            cols="12"
            sm="3"
          >
            <div>
              Last Updated At
            </div>
            <span class="text-high-emphasis font-weight-medium">
              {{ priceTableData?.updatedAt ? new Date(priceTableData.updatedAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : '...' }}
            </span>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Machine Information Section -->
    <VProgressLinear
      v-if="loadingMachine"
      indeterminate
      color="secondary"
      class="mb-6"
    />
    <VAlert
      v-else-if="errorMachine"
      type="error"
      class="mb-6"
    >
      Failed to load Machine details: {{ errorMachine }}
    </VAlert>
    <VCard
      v-else-if="machine"
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
      v-if="priceTableData"
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
            <label>Currency</label>
            <VTextField
              v-model="priceTableData.currency"
              :disabled="!priceTableData"
            />
          </VCol>
          <!-- 使用 AutoComplete 來呈現 Owner -->
          <VCol
            cols="12"
            md="3"
            sm="6"
          >
            <label>Owner</label>
            <VTextField
              v-model.number="priceTableData.ownerId"
              :disabled="!priceTableData"
              type="number"
            />
          </VCol>

          <!-- 使用 VDateInput 來呈現 Contract Start Date -->
          <VCol
            cols="
              12"
            md="3"
            sm="6"
          >
            <label>Contract Start Date</label>
            <VTextField
              v-model="priceTableData.contractStartDate"
              :rules="dateRules"
              :disabled="!priceTableData"
              type="date"
            />
          </VCol>

          <!-- 使用 VDateInput 來呈現 Contract End Date -->
          <VCol
            cols="12"
            md="3"
            sm="6"
          >
            <label>Contract End Date</label>
            <VTextField
              v-model="priceTableData.contractEndDate"
              :rules="dateRules"
              :disabled="!priceTableData"
              type="date"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <label>Remark</label>
            <VTextField
              v-model="priceTableData.remark"
              :disabled="!priceTableData"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <label>Attachment</label>
            <div class="attachment-field">
              <FileUploader
                :initial-attachments="attachments"
                :related-id="priceTableData.id"
                :disabled="!priceTableData"
                related-type="price-table"
                upload-url="/api/attachments/upload"
                delete-url="/api/attachments/delete"
                @update:attachments="handleAttachmentsUpdate"
                @upload-success="handleUploadSuccess"
                @upload-error="handleUploadError"
              />
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <VCardItem>
        <VCardTitle>Price Table Items</VCardTitle>
      </VCardItem>
      <VCardText class="d-flex gap-2">
        <VBtn :disabled="loadingEqpOptions">
          Choose P/N
        </VBtn>
        <VBtn @click="editMode = !editMode">
          {{ editMode ? 'Done' : 'Edit' }}
        </VBtn>
      </VCardText>
      <VCardText>
        <!-- Loading/Error for EQP Options affects the table -->
        <VProgressLinear
          v-if="loadingEqpOptions"
          indeterminate
          color="info"
        />
        <VAlert
          v-else-if="errorEqpOptions"
          type="error"
          class="mb-4"
        >
          Failed to load EQP Options: {{ errorEqpOptions }}
        </VAlert>
        <VDataTableVirtual
          v-else
          v-model:expanded="expanded"
          :headers="priceTableItemHeaders"
          :items="computedPriceTableItemsComputed"
          show-expand
          :group-by="[{ key: 'eqpOption.category', order: 'asc' }]"
          height="60vh"
          fixed-header
          item-value="id"
          @click:row="expandRow"
        >
          <template #item.data-table-group="{ item }">
            <VBtn
              size="x-small"
              variant="text"
              color="error"
              icon="ri-delete-bin-line"
              @click.stop="deleteRow(item)"
            />
          </template>
          <template #item.sequence="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.eqpOption.description="{ item }">
            {{ item.eqpOption.description }}
          </template>
          <template #expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length">
                <strong>Supplement:</strong> {{ item.eqpOption?.supplement || 'N/A' }}
              </td>
            </tr>
          </template>
          <template #item.savingBase="{ item }">
            <VTextField
              v-if="editMode"
              v-model.number="item.savingBase"
              type="number"
              density="compact"
              hide-details
              variant="underlined"
              class="editable-input text-right"
            />
            <span
              v-else
              class="d-block text-right"
            >{{ item.savingBase }}</span>
          </template>
          <template #item.listPrice="{ item }">
            <VTextField
              v-if="editMode"
              v-model.number="item.listPrice"
              type="number"
              density="compact"
              hide-details
              variant="underlined"
              class="editable-input text-right"
            />
            <span
              v-else
              class="d-block text-right"
            >{{ item.listPrice }}</span>
          </template>
          <template #item.referencePrice="{ item }">
            <VTextField
              v-if="editMode"
              v-model.number="item.referencePrice"
              type="number"
              density="compact"
              hide-details
              variant="underlined"
              class="editable-input text-right"
            />
            <span
              v-else
              class="d-block text-right"
            >{{ item.referencePrice }}</span>
          </template>
        </VDataTableVirtual>
      </VCardText>
    </VCard>
  </template>
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

.editable-input {
  /* padding: 5px; */
  /* border: 1px solid #007bff; */
  /* border-radius: 4px; */
  /* inline-size: 100%; */
  text-align: end;
}

/* Ensure the input text is aligned right within the text field */
.editable-input :deep(input) {
  text-align: right;
}
</style>

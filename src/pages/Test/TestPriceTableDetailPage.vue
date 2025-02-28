<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

import { VDateInput } from 'vuetify/labs/components'
import type { PriceTableResponse } from '@/api/services/mockService'
import { priceTableService } from '@/api/services/mockService'

// 初始化 priceTable 時確保是空對象
const priceTable = ref<PriceTableResponse | undefined>({} as PriceTableResponse)

const dateRules = [
  // 檢查是否是有效的日期格式
  (v: string) => !!v || 'Date is required', // 確保有值
  (v: string) => {
    const date = new Date(v)

    return !Number.isNaN(date.getTime()) || 'Invalid date format'
  },
]

onBeforeMount(async () => {
  const route = useRoute()
  const id = route.params.id

  priceTable.value = await priceTableService.getPriceTableById(Number(id))
  console.log(priceTable.value)
})
</script>

<!--
  1. Price Table 固定資訊 (單號、狀態、新增人員、新增時間、最後修改人員、最後修改時間)
  2. Price Table 可修改資訊 (幣別、Owner、Contract Start Date、Contract End Date、Remark)
  3. Price Table 附件上傳、下載 RFQ Template
  4. Machine 資訊 (Maker、Model Name、Process、Supplier、Country)
  5. Price Table Items (會是一個表格，含有以下資訊：Type, Category, PartNumber, Supplier PartNumber, SavingBase, List Price)，並且可以新增，或是使用一個選單從料號清單裡面帶出
  6. 單據操作功能：Save、Delete、Submit、Approve、Reject、Close
  7. 單據的歷史修改紀錄查看
  8. 簽核流程跟簽核歷程
-->
<template>
  <!-- 使用 Vuetify v-card 顯示詳細資訊 -->
  <VCard
    v-if="priceTable"
    class="mb-6"
  >
    <VCardItem>
      <VCardTitle class="d-flex">
        <!-- <span class="headline">Price Table Details</span> -->
        {{ priceTable.orderNumber }} <VChip
          size="small"
          color="warning"
        >
          Draft
        </VChip>
        <VSpacer />
        <VBtn>Save</VBtn>
      </VCardTitle>
    </VCardItem>
  </VCard>
  <VDivider />
  <VCard v-if="priceTable">
    <VCardText>
      <VRow>
        <!-- 使用 TextField 來呈現 Order Number -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="priceTable.orderNumber"
            label="Order Number"
            readonly
          />
        </VCol>

        <!-- 使用 TextField 來呈現 Machine ID -->
        <VCol
          cols="12"
          md="6"
        >
          <VTextField
            v-model="priceTable.machineId"
            label="Machine ID"
            readonly
          />
        </VCol>
      </VRow>
    </VCardText>

    <VCardText>
      <VRow>
        <!-- 使用 TextField 來呈現 Currency -->
        <VCol
          cols="12"
          lg="3"
        >
          <VTextField
            v-model="priceTable.currency"
            label="Currency"
          />
        </VCol>

        <!-- 使用 VDateInput 來呈現 Contract Start Date -->
        <VCol
          cols="12"
          lg="3"
        >
          <VDateInput
            v-model="priceTable.contractStartDate"
            label="Contract Start Date"
            variant="outlined"
            density="comfortable"
            prepend-icon=""
            prepend-inner-icon="$calendar"
            :rules="dateRules"
          />
        </VCol>

        <!-- 使用 VDateInput 來呈現 Contract End Date -->
        <VCol
          cols="12"
          lg="3"
        >
          <VDateInput
            v-model="priceTable.contractEndDate"
            label="Contract End Date"
            variant="outlined"
            density="comfortable"
            prepend-icon=""
            prepend-inner-icon="$calendar"
            :rules="dateRules"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.headline {
  font-weight: bold;
}
</style>

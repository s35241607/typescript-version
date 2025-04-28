<script setup lang="ts">
import { computed, ref } from 'vue'

// Attempt to resolve VDataTableServer type issue - assuming labs components might be integrated or aliased
// If this fails, the project setup for Vuetify Labs likely needs adjustment.
import type { VDataTableServer } from 'vuetify/components/VDataTable' // Trying non-labs path
import { VStepper, VStepperItem } from 'vuetify/components/VStepper'

// --- Types ---
interface BasicInfo {
  id: string
  supplier: string
  validityPeriod: string
  paymentTerms: string
  establishedDate: string
  submitter: string
  currency: string
  status: string
}

interface PriceItem {
  id: number
  materialNumber: string
  productName: string
  unit: string
  quantity: number
  unitPrice: number
  subtotal: number
  notes: string
}

interface WorkflowStep {
  title: string
  subtitle: string
  date: string
  status: 'pending' | 'completed' | 'rejected' | 'current'
  details?: string
}

// --- Workflow Steps Data ---
const workflowSteps = ref<WorkflowStep[]>([
  { title: '提交審核', subtitle: '採購部', date: '2023-11-15', status: 'completed', details: '已附上最新報價單' },
  { title: '採購主管', subtitle: '採購經理', date: '2023-11-16', status: 'completed' },
  { title: '財務部', subtitle: '財務主管', date: '2023-11-17', status: 'current' },
  { title: '總經理', subtitle: '總經理', date: '2023-11-18', status: 'pending' },
  { title: '完成', subtitle: '(狀態)', date: '2023-11-19', status: 'pending' },
])

// Determine the current step value for VStepper (using title as value)
const currentStepValue = computed(() => {
  const current = workflowSteps.value.find(step => step.status === 'current')
  if (current)
    return current.title // Removed unnecessary braces

  const firstPending = workflowSteps.value.find(step => step.status === 'pending')
  if (firstPending)
    return firstPending.title // Removed unnecessary braces

  // Fallback if all completed or other cases
  const lastCompleted = workflowSteps.value.filter(step => step.status === 'completed').pop()
  if (lastCompleted)
    return lastCompleted.title // Removed unnecessary braces

  return workflowSteps.value[0]?.title // Default to first step title
})

// --- 響應式狀態 ---
const reviewAction = ref<'approve' | 'reject' | 'countersign'>('approve')
const reviewComment = ref('')
const historyView = ref<'flow' | 'list'>('flow')

const basicInfo = ref<BasicInfo>({
  id: 'PT-2023-0458',
  supplier: '台灣科技材料有限公司',
  validityPeriod: '2023-12-01 至 2024-11-30',
  paymentTerms: '月結 60 天',
  establishedDate: '2023-11-15',
  submitter: '王小明 (採購部)',
  currency: '新台幣 (TWD)',
  status: '審核中',
})

const priceItems = ref<PriceItem[]>([
  { id: 1, materialNumber: 'M-10458', productName: '高純度矽晶圓 (8吋)', unit: '片', quantity: 1000, unitPrice: 2500, subtotal: 2500000, notes: '標準規格，無特殊處理' },
  { id: 2, materialNumber: 'M-10459', productName: '高純度矽晶圓 (12吋)', unit: '片', quantity: 500, unitPrice: 5800, subtotal: 2900000, notes: '特殊規格，需預先生產' },
])

// --- Table ---
// Use specific type if import works, otherwise fallback to any[]
// Corrected indentation for headers array elements
const headers: InstanceType<typeof VDataTableServer>['$props']['headers'] | any[] = [
  { title: '項次', key: 'id', sortable: false, width: '50px' },
  { title: '料號', key: 'materialNumber', sortable: false },
  { title: '品名', key: 'productName', sortable: false },
  { title: '單位', key: 'unit', sortable: false, align: 'end' },
  { title: '數量', key: 'quantity', sortable: false, align: 'end' },
  { title: '單價', key: 'unitPrice', sortable: false, align: 'end' },
  { title: '小計', key: 'subtotal', sortable: false, align: 'end' },
  { title: '備註', key: 'notes', sortable: false },
]

const totalItems = computed(() => priceItems.value.length)

// --- 方法 ---
function submitReview() {
  console.log('提交簽核:', { action: reviewAction.value, comment: reviewComment.value })
}

function viewFullHistory() {
  console.log('查看完整歷程')
}

function batchUpload() {
  console.log('批次上傳')
}

function addNewItem() {
  console.log('新增項目')
}

function formatCurrency(value: number): string {
  return `NT$ ${value.toLocaleString('en-US')}`
}

function getWorkflowStepColor(status: WorkflowStep['status']): string {
  switch (status) {
    case 'completed':
      return 'success'
    case 'rejected':
      return 'error'
    case 'current':
      return 'info'
    case 'pending':
    default:
      return 'blue-grey-lighten-1'
  }
}

function getWorkflowStepIcon(status: WorkflowStep['status']): string {
  switch (status) {
    case 'completed':
      return 'ri-checkbox-circle-fill'
    case 'rejected':
      return 'ri-close-circle-fill'
    case 'current':
      return 'ri-loader-4-line'
    case 'pending':
    default:
      return 'ri-checkbox-blank-circle-line'
  }
}
</script>

<template>
  <VContainer fluid>
    <!-- 頁面標題和操作按鈕 -->
    <VRow
      align="center"
      class="mb-4"
    >
      <VCol
        cols="12"
        sm="6"
      >
        <h1 class="text-h5">
          價格表審核
        </h1>
      </VCol>
      <VCol
        cols="12"
        sm="6"
        class="d-flex justify-end align-center"
      >
        <VBtn
          variant="text"
          class="mr-1"
          prepend-icon="ri-refresh-line"
        >
          重新整理
        </VBtn>
        <VBtn
          variant="text"
          class="mr-1"
          prepend-icon="ri-download-line"
        >
          匯出
        </VBtn>
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              icon="ri-more-line"
              v-bind="props"
              variant="text"
              density="compact"
            />
          </template>
          <VList density="compact">
            <VListItem @click="() => {}">
              <VListItemTitle>操作 1</VListItemTitle>
            </VListItem>
            <VListItem @click="() => {}">
              <VListItemTitle>操作 2</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VCol>
    </VRow>

    <!-- Top Section: Review & History -->
    <VRow class="mb-6">
      <!-- 左側：簽核意見 -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          variant="outlined"
          height="100%"
        >
          <VCardTitle class="d-flex justify-space-between align-center text-subtitle-1">
            簽核意見
            <VChip
              color="info"
              variant="flat"
              size="small"
            >
              財務部審核階段
            </VChip>
          </VCardTitle>
          <VDivider />
          <VCardText class="d-flex flex-column flex-grow-1">
            <VBtnToggle
              v-model="reviewAction"
              mandatory
              variant="text"
              class="mb-4 align-self-stretch review-actions"
              density="compact"
            >
              <VBtn
                value="approve"
                class="flex-grow-1"
                :color="reviewAction === 'approve' ? 'primary' : undefined"
              >
                核准
              </VBtn>
              <VBtn
                value="reject"
                class="flex-grow-1"
                :color="reviewAction === 'reject' ? 'error' : undefined"
              >
                退回
              </VBtn>
              <VBtn
                value="countersign"
                class="flex-grow-1"
                :color="reviewAction === 'countersign' ? 'secondary' : undefined"
              >
                加簽
              </VBtn>
            </VBtnToggle>

            <VTextarea
              v-model="reviewComment"
              placeholder="請輸入核准意見..."
              variant="outlined"
              rows="4"
              no-resize
              auto-grow
              class="mb-4 flex-grow-1"
              density="compact"
            />

            <div class="d-flex justify-space-between align-center mt-auto">
              <VBtn
                variant="text"
                prepend-icon="ri-attachment-line"
                size="small"
              >
                附件
              </VBtn>
              <VBtn
                :color="reviewAction === 'reject' ? 'error' : 'primary'"
                :prepend-icon="reviewAction === 'reject' ? 'ri-arrow-left-line' : 'ri-thumb-up-line'"
                variant="flat"
                @click="submitReview"
              >
                {{ reviewAction === 'approve' ? '核准' : (reviewAction === 'reject' ? '退回' : '送出') }}
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 右側：簽核流程與歷程 -->
      <VCol
        cols="12"
        md="8"
      >
        <VCard
          variant="outlined"
          height="100%"
        >
          <VCardTitle class="d-flex justify-space-between align-center text-subtitle-1">
            簽核流程與歷程
            <VBtnToggle
              v-model="historyView"
              mandatory
              variant="outlined"
            >
              <VBtn
                value="flow"
                size="small"
              >
                流程圖
              </VBtn>
              <VBtn
                value="list"
                size="small"
              >
                歷程列表
              </VBtn>
            </VBtnToggle>
          </VCardTitle>
          <VDivider />

          <VWindow
            v-model="historyView"
            class="flex-grow-1"
          >
            <!-- Flow View using VStepper -->
            <VWindowItem
              value="flow"
              class="pa-4"
            >
              <VStepper
                :model-value="currentStepValue"
                alt-labels
                hide-actions
              >
                <!-- Manually render VStepperItem using v-for -->
                <template
                  v-for="(step) in workflowSteps"
                  :key="step.title"
                >
                  <VStepperItem
                    :value="step.title"
                    :title="step.title"
                    :subtitle="step.subtitle"
                    :color="getWorkflowStepColor(step.status)"
                    :icon="getWorkflowStepIcon(step.status)"
                    :editable="false"
                  >
                    <template #default>
                      <div class="text-caption text-medium-emphasis">
                        {{ step.date }}
                      </div>
                      <VChip
                        v-if="step.details"
                        density="compact"
                        :color="getWorkflowStepColor(step.status)"
                        variant="tonal"
                        class="mt-1"
                        label
                        size="small"
                      >
                        {{ step.details }}
                      </VChip>
                    </template>
                  </VStepperItem>
                </template>
              </VStepper>
            </VWindowItem>

            <!-- List View -->
            <VWindowItem
              value="list"
              class="pa-4"
            >
              <div class="text-subtitle-1 mb-3">
                最近動態
              </div>
              <VList
                lines="two"
                density="compact"
              >
                <VListItem class="mb-2 pa-0">
                  <div>
                    <VChip
                      color="warning"
                      variant="flat"
                      label
                      size="small"
                      class="mr-2"
                    >
                      拉回
                    </VChip>
                    <span class="font-weight-bold">王小明</span>
                    <span class="text-medium-emphasis"> (採購部)</span>
                    <div class="text-caption text-medium-emphasis float-right">
                      2023-11-19 09:10
                    </div>
                    <div class="text-body-2 mt-1 ml-1">
                      需要修改部分項目規格，拉回重新編輯。
                    </div>
                  </div>
                </VListItem>
                <VDivider class="my-2" />
                <VListItem class="pa-0">
                  <div>
                    <VChip
                      color="success"
                      variant="flat"
                      label
                      size="small"
                      class="mr-2"
                    >
                      核准
                    </VChip>
                    <span class="font-weight-bold">張總</span>
                    <span class="text-medium-emphasis"> (總經理)</span>
                    <div class="text-caption text-medium-emphasis float-right">
                      2023-11-18 16:20
                    </div>
                    <div class="text-body-2 mt-1 ml-1">
                      同意此價格表，請財務部門進行後續處理。
                    </div>
                  </div>
                </VListItem>
              </VList>
              <div class="text-center mt-4">
                <VBtn
                  variant="text"
                  size="small"
                  append-icon="ri-arrow-right-s-line"
                  @click="viewFullHistory"
                >
                  查看完整歷程
                </VBtn>
              </div>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Middle Section: Basic Info -->
    <VCard
      class="mb-6"
      variant="outlined"
    >
      <VCardTitle class="d-flex justify-space-between align-center text-subtitle-1">
        價格表基本資訊
        <VChip
          color="primary"
          variant="flat"
          size="small"
        >
          {{ basicInfo.status }}
        </VChip>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VRow dense>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              表單編號
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.id }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              建立日期
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.establishedDate }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              提交人
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.submitter }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              供應商
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.supplier }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              合約期間
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.validityPeriod }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              付款條件
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.paymentTerms }}
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              幣別
            </div>
            <div class="font-weight-medium">
              {{ basicInfo.currency }}
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Bottom Section: Price Items Table -->
    <VCard variant="outlined">
      <VCardTitle class="d-flex justify-space-between align-center text-subtitle-1">
        價格項目清單
        <div>
          <VBtn
            color="secondary"
            variant="tonal"
            size="small"
            class="mr-2"
            prepend-icon="ri-upload-2-line"
            @click="batchUpload"
          >
            批次上傳
          </VBtn>
          <VBtn
            color="primary"
            variant="flat"
            size="small"
            prepend-icon="ri-add-line"
            @click="addNewItem"
          >
            新增項目
          </VBtn>
        </div>
      </VCardTitle>
      <VDivider />
      <VDataTableServer
        :headers="headers"
        :items="priceItems"
        :items-length="totalItems"
        item-value="id"
        class="text-no-wrap"
        density="compact"
        fixed-header
        hover
        items-per-page="10"
      >
        <template #item.unitPrice="{ item }">
          {{ formatCurrency(item.unitPrice) }}
        </template>
        <template #item.subtotal="{ item }">
          {{ formatCurrency(item.subtotal) }}
        </template>
        <!-- Example Actions Column -->
        <!--
          <template #item.actions="{ item }">
          <VBtn icon="ri-pencil-line" variant="text" size="x-small" class="mr-1"></VBtn>
          <VBtn icon="ri-delete-bin-line" variant="text" size="x-small"></VBtn>
          </template>
        -->
      </VDataTableServer>
    </VCard>
  </VContainer>
</template>

<style scoped>
/* Make Stepper horizontal line visible and styled */
.v-stepper :deep(.v-stepper-header .v-divider) {
  border-width: thin;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  margin-inline: 0.5rem;
}

/* Ensure Stepper items have enough space and are centered */
.v-stepper :deep(.v-stepper-header) {
  display: flex;
  justify-content: space-between; /* Distribute space between items */
  align-items: flex-start; /* Align items at the start */
  width: 100%; /* Ensure header takes full width */
}

.v-stepper :deep(.v-stepper-item) {
  flex: 1 1 0; /* Allow items to grow and shrink, basis 0 */
  min-width: 100px; /* Set a minimum width if needed */
  text-align: center; /* Center text within the item */
}

/* Adjust stepper item content alignment */
.v-stepper :deep(.v-stepper-item__content) {
  text-align: center; /* Center date and chip below the icon */
  margin-top: 4px; /* Add some space above the date/chip */
}

/* Ensure vertical divider aligns with item */
.v-stepper :deep(.v-stepper-item .v-divider) {
  margin-top: 36px; /* Adjust based on icon/title size */
}

.v-list-item + .v-divider {
  margin-block-start: 0.5rem;
  margin-block-end: 0.5rem;
}

.v-table {
  overflow-x: auto;
}

/* Style for review action buttons */
.review-actions .v-btn {
  border: none !important; /* Remove border from all buttons */
}
.review-actions .v-btn--active {
  /* Optionally add style for active button, e.g., background */
   /* background-color: rgba(var(--v-theme-primary), 0.1); */
}

/* Ensure history view toggle buttons take content width */
.v-card-title .v-btn-toggle .v-btn {
  width: auto; /* Allow width to be determined by content */
  flex-grow: 0; /* Prevent buttons from growing to fill space */
}

/* Adjustments for list view to match dark theme better */
.list-view-container .v-list {
  background-color: transparent !important;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

// --- 響應式狀態 ---
// 簽核動作 (approve, reject, countersign)
const reviewAction = ref<'approve' | 'reject' | 'countersign'>('approve')

// 簽核意見
const reviewComment = ref('')

// 流程/歷程 視圖切換 (flow, list)
const historyView = ref<'flow' | 'list'>('flow')

// --- 方法 ---
function submitReview() {
  console.log('提交簽核:', {
    action: reviewAction.value,
    comment: reviewComment.value,
  })

  // 在這裡加入實際的提交邏輯，例如呼叫 API
}

function viewFullHistory() {
  console.log('查看完整歷程')

  // 在這裡加入導航到完整歷程頁面的邏輯
}

// --- Context API (範例) ---
// 如果這個 Dashboard 需要與父元件或子元件共享狀態（例如使用者資訊、權限等）
// 您可以在這裡使用 provide/inject。
// 假設有一個從父元件提供的 UserContext
/*
import { inject } from 'vue';
import { UserContextKey } from './keys'; // 假設定義了 InjectionKey

const userContext = inject(UserContextKey);

if (userContext) {
  console.log('Current User:', userContext.user.value?.name);
}
*/
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
        md="6"
      >
        <h1 class="text-h5">
          價格表審核
        </h1>
      </VCol>
      <VCol
        cols="12"
        md="6"
        class="d-flex justify-end"
      >
        <VBtn
          icon="ri-sun-line"
          variant="text"
          class="mr-2"
        />
        <VBtn
          icon="ri-refresh-line"
          variant="text"
          class="mr-2"
        >
          <template #prepend>
            <VIcon>ri-refresh-line</VIcon>
          </template>
          重新整理
        </VBtn>
        <VBtn
          icon="ri-download-line"
          variant="text"
          class="mr-2"
        >
          <template #prepend>
            <VIcon>ri-download-line</VIcon>
          </template>
          匯出
        </VBtn>
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              icon="ri-more-line"
              v-bind="props"
              variant="text"
            />
          </template>
          <VList>
            <!-- 更多操作選項 -->
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

    <VRow>
      <!-- 左側：簽核意見 -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard outlined>
          <VCardTitle class="d-flex justify-space-between align-center">
            簽核意見
            <VChip
              color="blue-lighten-1"
              variant="flat"
              size="small"
            >
              財務部審核階段
            </VChip>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VBtnToggle
              v-model="reviewAction"
              mandatory
              variant="outlined"
              divided
              class="mb-4 d-flex"
            >
              <VBtn
                value="approve"
                class="flex-grow-1"
              >
                核准
              </VBtn>
              <VBtn
                value="reject"
                class="flex-grow-1"
              >
                退回
              </VBtn>
              <VBtn
                value="countersign"
                class="flex-grow-1"
              >
                加簽
              </VBtn>
            </VBtnToggle>

            <VTextarea
              v-model="reviewComment"
              label="請輸入核准意見..."
              variant="outlined"
              rows="5"
              no-resize
              auto-grow
              class="mb-4"
            />

            <div class="d-flex justify-space-between align-center">
              <VBtn
                variant="text"
                prepend-icon="ri-attachment-line"
              >
                附件
                <!-- 在這裡可以加上傳或顯示附件的邏輯 -->
              </VBtn>

              <VBtn
                :color="reviewAction === 'reject' ? 'error' : 'black'"
                :prepend-icon="reviewAction === 'reject' ? 'ri-arrow-left-line' : 'ri-thumb-up-line'"
                size="large"
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
        <VCard outlined>
          <VCardTitle class="d-flex justify-space-between align-center">
            簽核流程與歷程
            <VBtnToggle
              v-model="historyView"
              mandatory
              variant="outlined"
              density="compact"
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

          <VWindow v-model="historyView">
            <VWindowItem value="flow">
              <VCardText>
                <!-- 流程圖：使用 v-timeline -->
                <VTimeline
                  side="end"
                  align="start"
                  truncate-line="both"
                  density="compact"
                >
                  <VTimelineItem
                    dot-color="blue"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-medium">
                        提交審核
                      </div>
                      <div class="text-caption">
                        採購部
                      </div>
                      <div class="text-caption text-grey">
                        2023-11-15
                      </div>
                    </div>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="green"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-medium">
                        採購主管
                      </div>
                      <div class="text-caption">
                        採購經理
                      </div>
                      <div class="text-caption text-grey">
                        2023-11-16
                      </div>
                    </div>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="green"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-medium">
                        財務部
                      </div>
                      <div class="text-caption">
                        財務主管
                      </div>
                      <div class="text-caption text-grey">
                        2023-11-17
                      </div>
                    </div>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="green"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-medium">
                        總經理
                      </div>
                      <div class="text-caption">
                        總經理
                      </div>
                      <div class="text-caption text-grey">
                        2023-11-18
                      </div>
                    </div>
                  </VTimelineItem>

                  <VTimelineItem
                    dot-color="orange"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-medium">
                        完成 (已退回)
                      </div>
                      <div class="text-caption text-grey">
                        2023-11-19
                      </div>
                      <VChip
                        density="compact"
                        variant="tonal"
                        class="mt-1"
                      >
                        需要修改部分項目規格，拉回重新編輯。
                      </VChip>
                    </div>
                  </VTimelineItem>
                </VTimeline>
              </VCardText>
            </VWindowItem>

            <VWindowItem value="list">
              <VCardText>
                <!-- 歷程列表：使用 v-list 或類似結構 -->
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
                        color="orange-lighten-2"
                        label
                        size="small"
                        class="mr-2"
                      >
                        拉回
                      </VChip>
                      <span class="font-weight-bold">王小明</span>
                      <span class="text-grey-darken-1"> (採購部)</span>
                      <div class="text-caption text-grey-darken-1 float-right">
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
                        color="green-lighten-1"
                        label
                        size="small"
                        class="mr-2"
                      >
                        核准
                      </VChip>
                      <span class="font-weight-bold">張總</span>
                      <span class="text-grey-darken-1"> (總經理)</span>
                      <div class="text-caption text-grey-darken-1 float-right">
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
                    append-icon="ri-arrow-right-s-line"
                    @click="viewFullHistory"
                  >
                    查看完整歷程
                  </VBtn>
                </div>
              </VCardText>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
/* 您可以在這裡添加自定義樣式 */
.v-timeline--vertical.v-timeline {
  grid-row-gap: 0.75rem; /* 調整時間軸項目間距 */
}
.v-list-item + .v-divider {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

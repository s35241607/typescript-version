<script setup lang="ts">
import { ref } from 'vue'
import TiptapEditor from '@/components/TiptapEditor.vue'
import TiptapEditorV2 from '@/components/TiptapEditorV2.vue'

// 頁面設定
defineOptions({
  name: 'TiptapComparison',
})

// 編輯器狀態
const editorContentV1 = ref('<h2>基礎版編輯器</h2><p>這是一個簡單的富文本編輯器。</p>')
const editorContentV2 = ref('<h2>增強版編輯器</h2><p>這是一個具有更多功能的富文本編輯器。</p>')
const editorHeight = ref('400px')
const showToolbar = ref(true)
const currentTab = ref('v1')

// 編輯器配置
const isDisabled = ref(false)

// 事件處理
function onEditorReady(editor: any) {
  console.log('編輯器已就緒:', editor)
}

function resetContent() {
  if (currentTab.value === 'v1')
    editorContentV1.value = '<h2>重設內容</h2><p>基礎版編輯器內容已重設。</p>'
  else
    editorContentV2.value = '<h2>重設內容</h2><p>增強版編輯器內容已重設。</p>'
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>Tiptap 編輯器對比</VCardTitle>
          <VCardSubtitle>比較基礎版本與增強版本的功能差異</VCardSubtitle>

          <VCardText>
            <VTabs v-model="currentTab">
              <VTab value="v1">
                基礎版本
              </VTab>
              <VTab value="v2">
                增強版本
              </VTab>
            </VTabs>

            <VTabsWindow
              v-model="currentTab"
              class="mt-4"
            >
              <!-- 基礎版本 -->
              <VTabsWindowItem value="v1">
                <VCard
                  flat
                  border
                >
                  <VCardTitle class="text-h6">
                    基礎 Tiptap 編輯器
                  </VCardTitle>
                  <VCardText>
                    <TiptapEditor
                      v-model="editorContentV1"
                      :height="editorHeight"
                      :disabled="isDisabled"
                      :show-toolbar="showToolbar"
                      placeholder="請開始輸入您的內容..."
                      data-activity="basic-tiptap-editor"
                      @ready="onEditorReady"
                    />
                  </VCardText>
                </VCard>
              </VTabsWindowItem>

              <!-- 增強版本 -->
              <VTabsWindowItem value="v2">
                <VCard
                  flat
                  border
                >
                  <VCardTitle class="text-h6">
                    增強 Tiptap 編輯器 (V2)
                  </VCardTitle>
                  <VCardText>
                    <TiptapEditorV2
                      v-model="editorContentV2"
                      :height="editorHeight"
                      :disabled="isDisabled"
                      :show-toolbar="showToolbar"
                      enable-image-resize
                      placeholder="請開始輸入您的內容..."
                      data-activity="enhanced-tiptap-editor"
                      @ready="onEditorReady"
                    />
                  </VCardText>
                </VCard>
              </VTabsWindowItem>
            </VTabsWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 設定面板 -->
    <VRow class="mt-4">
      <VCol
        cols="12"
        md="6"
      >
        <VCard>
          <VCardTitle>編輯器設定</VCardTitle>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  v-model="editorHeight"
                  label="編輯器高度"
                  placeholder="400px"
                  prepend-icon="ri-expand-up-down-line"
                  variant="outlined"
                  density="compact"
                  data-activity="editor-height-input"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VSwitch
                  v-model="showToolbar"
                  label="顯示工具列"
                  color="primary"
                  data-activity="show-toolbar-switch"
                />
                <VSwitch
                  v-model="isDisabled"
                  label="禁用編輯器"
                  color="primary"
                  data-activity="disable-editor-switch"
                />
              </VCol>
            </VRow>

            <VBtn
              color="primary"
              prepend-icon="ri-refresh-line"
              data-activity="reset-content-btn"
              @click="resetContent"
            >
              重設內容
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <VCard>
          <VCardTitle>內容預覽</VCardTitle>
          <VCardText>
            <VTextarea
              :model-value="currentTab === 'v1' ? editorContentV1 : editorContentV2"
              label="HTML 內容"
              variant="outlined"
              rows="8"
              readonly
              data-activity="html-preview"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 功能對比 -->
    <VRow class="mt-4">
      <VCol cols="12">
        <VCard>
          <VCardTitle>功能對比</VCardTitle>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VCard
                  flat
                  color="primary"
                  variant="tonal"
                >
                  <VCardTitle class="text-h6">
                    <VIcon
                      icon="ri-edit-line"
                      class="me-2"
                    />
                    基礎版本功能
                  </VCardTitle>
                  <VCardText>
                    <VList density="compact">
                      <VListItem prepend-icon="ri-bold">
                        基本格式：粗體、斜體、底線、刪除線
                      </VListItem>
                      <VListItem prepend-icon="ri-h-1">
                        標題：H1-H6 層級
                      </VListItem>
                      <VListItem prepend-icon="ri-list-unordered">
                        列表：有序與無序列表
                      </VListItem>
                      <VListItem prepend-icon="ri-double-quotes-l">
                        引用區塊
                      </VListItem>
                      <VListItem prepend-icon="ri-code-line">
                        程式碼：行內與區塊
                      </VListItem>
                      <VListItem prepend-icon="ri-image-line">
                        圖片：URL 插入
                      </VListItem>
                      <VListItem prepend-icon="ri-link">
                        連結：插入與編輯
                      </VListItem>
                    </VList>
                  </VCardText>
                </VCard>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VCard
                  flat
                  color="success"
                  variant="tonal"
                >
                  <VCardTitle class="text-h6">
                    <VIcon
                      icon="ri-magic-line"
                      class="me-2"
                    />
                    增強版本功能
                  </VCardTitle>
                  <VCardText>
                    <VList density="compact">
                      <VListItem prepend-icon="ri-palette-line">
                        <strong>文字與高亮顏色</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-align-center">
                        <strong>文字對齊選項</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-upload-line">
                        <strong>檔案上傳功能</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-tools-line">
                        <strong>Vuetify 美化工具列</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-question-line">
                        <strong>工具提示與說明</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-paint-brush-line">
                        <strong>主題自適應</strong>
                      </VListItem>
                      <VListItem prepend-icon="ri-layout-grid-line">
                        <strong>響應式設計</strong>
                      </VListItem>
                    </VList>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 使用說明 -->
    <VRow class="mt-4">
      <VCol cols="12">
        <VCard>
          <VCardTitle>使用說明</VCardTitle>
          <VCardText>
            <VExpansionPanels>
              <VExpansionPanel title="基本操作">
                <VExpansionPanelText>
                  <p>• 選擇文字後，使用工具列按鈕進行格式化</p>
                  <p>• 使用快捷鍵：<kbd>Ctrl+B</kbd> 粗體，<kbd>Ctrl+I</kbd> 斜體，<kbd>Ctrl+U</kbd> 底線</p>
                  <p>• 按 <kbd>Enter</kbd> 換行，<kbd>Shift+Enter</kbd> 軟換行</p>
                </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel title="圖片插入">
                <VExpansionPanelText>
                  <p>• <strong>基礎版</strong>：僅支援 URL 輸入</p>
                  <p>• <strong>增強版</strong>：支援 URL 輸入和檔案上傳</p>
                  <p>• 插入後可點擊圖片進行選擇和調整</p>
                </VExpansionPanelText>
              </VExpansionPanel>

              <VExpansionPanel title="顏色功能（僅增強版）">
                <VExpansionPanelText>
                  <p>• 點擊文字顏色圖示選擇文字顏色</p>
                  <p>• 點擊高亮圖示選擇背景高亮色</p>
                  <p>• 支援多種預設顏色，也可自訂顏色值</p>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

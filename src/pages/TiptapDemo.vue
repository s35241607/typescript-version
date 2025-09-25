<script lang="ts" setup>
import { ref } from 'vue'
import TiptapEditor from '@/components/TiptapEditor.vue'

// 頁面標題
const title = 'Tiptap Rich Text Editor Demo'

// 編輯器內容
const editorContent = ref(`
<h1>歡迎使用 Tiptap 富文本編輯器</h1>
<p>這是一個功能豐富的 <strong>富文本編輯器</strong> 示例，基於 <em>Tiptap</em> 構建。</p>

<h2>主要功能</h2>
<ul>
  <li><strong>基本格式化</strong>：粗體、斜體、底線、刪除線</li>
  <li><span style="color: #e53e3e">文字顏色</span> 和 <mark style="background-color: #ffeb3b">高亮顯示</mark></li>
  <li>多級標題支持（H1-H3）</li>
  <li>清單項目（有序和無序）</li>
  <li>文字對齊（左、中、右）</li>
</ul>

<h3>程式碼支持</h3>
<p>支持行內 <code>程式碼</code> 和區塊程式碼：</p>
<pre><code>function hello() {
  console.log('Hello Tiptap!');
}</code></pre>

<blockquote>
  <p>這是一個引用區塊，可用於突出顯示重要內容。</p>
</blockquote>

<p style="text-align: center">你可以將文字置中對齊</p>
<p style="text-align: right">或者右對齊</p>

<p>試試看編輯這些內容，體驗 Tiptap 編輯器的強大功能！</p>
`)

// 編輯器配置
const editorDisabled = ref(false)
const showToolbar = ref(true)
const editorHeight = ref('400px')

// 編輯器實例引用
const tiptapEditorRef = ref()

// 編輯器事件處理
const onEditorReady = (editor: any) => {
  console.log('Tiptap editor is ready:', editor)
}

// 操作函數
const clearContent = () => {
  editorContent.value = ''
}

const insertSampleContent = () => {
  editorContent.value = `
<h2>範例內容</h2>
<p>這是一段 <strong>範例文字</strong>，包含了各種格式。</p>
<ul>
  <li>項目一</li>
  <li>項目二</li>
</ul>
  `
}

const getEditorStats = () => {
  const editor = tiptapEditorRef.value?.getEditor()
  if (editor) {
    const text = editor.getText()
    const html = editor.getHTML()

    // 使用 console.log 代替 alert
    console.log('編輯器統計資訊:', {
      textLength: text.length,
      htmlLength: html.length,
    })

    // 或者可以使用 Vuetify 的 snackbar 來顯示信息
    // 這裡暫時使用 console.log
  }
}

const focusEditor = () => {
  tiptapEditorRef.value?.focus()
}
</script>

<template>
  <div>
    <!-- 頁面標題 -->
    <VRow>
      <VCol cols="12">
        <div class="d-flex align-center justify-space-between mb-6">
          <div>
            <h1 class="text-h3 font-weight-medium mb-2">
              {{ title }}
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-0">
              功能豐富的富文本編輯器，基於 Tiptap 構建
            </p>
          </div>
        </div>
      </VCol>
    </VRow>

    <VRow>
      <!-- 編輯器配置面板 -->
      <VCol
        cols="12"
        lg="4"
      >
        <VCard
          title="編輯器設定"
          data-activity="editor-config-panel"
        >
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VSwitch
                  v-model="editorDisabled"
                  label="禁用編輯器"
                  color="primary"
                  data-activity="toggle-disabled"
                />
              </VCol>

              <VCol cols="12">
                <VSwitch
                  v-model="showToolbar"
                  label="顯示工具欄"
                  color="primary"
                  data-activity="toggle-toolbar"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="editorHeight"
                  label="編輯器高度"
                  placeholder="400px"
                  density="compact"
                  data-activity="editor-height-input"
                />
              </VCol>
            </VRow>

            <VDivider class="my-4" />

            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 mb-3">
                  操作選項
                </h6>

                <VBtn
                  color="primary"
                  variant="outlined"
                  size="small"
                  class="me-2 mb-2"
                  data-activity="focus-editor"
                  @click="focusEditor"
                >
                  <VIcon
                    icon="ri-focus-line"
                    class="me-1"
                  />
                  聚焦編輯器
                </VBtn>

                <VBtn
                  color="success"
                  variant="outlined"
                  size="small"
                  class="me-2 mb-2"
                  data-activity="insert-sample"
                  @click="insertSampleContent"
                >
                  <VIcon
                    icon="ri-file-text-line"
                    class="me-1"
                  />
                  插入範例
                </VBtn>

                <VBtn
                  color="info"
                  variant="outlined"
                  size="small"
                  class="me-2 mb-2"
                  data-activity="get-stats"
                  @click="getEditorStats"
                >
                  <VIcon
                    icon="ri-bar-chart-line"
                    class="me-1"
                  />
                  統計資訊
                </VBtn>

                <VBtn
                  color="error"
                  variant="outlined"
                  size="small"
                  class="me-2 mb-2"
                  data-activity="clear-content"
                  @click="clearContent"
                >
                  <VIcon
                    icon="ri-delete-bin-line"
                    class="me-1"
                  />
                  清空內容
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- 內容預覽 -->
        <VCard
          title="HTML 內容預覽"
          class="mt-6"
          data-activity="html-preview-panel"
        >
          <VCardText>
            <pre class="code-preview">{{ editorContent }}</pre>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 編輯器主區域 -->
      <VCol
        cols="12"
        lg="8"
      >
        <VCard
          title="Tiptap 編輯器"
          data-activity="tiptap-editor-panel"
        >
          <VCardText>
            <TiptapEditor
              ref="tiptapEditorRef"
              v-model="editorContent"
              :disabled="editorDisabled"
              :show-toolbar="showToolbar"
              :height="editorHeight"
              placeholder="在此輸入您的內容..."
              data-activity="tiptap-editor-instance"
              @ready="onEditorReady"
            />
          </VCardText>
        </VCard>

        <!-- 功能說明 -->
        <VCard
          title="功能說明"
          class="mt-6"
          data-activity="feature-info-panel"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                sm="6"
              >
                <h6 class="text-h6 mb-2">
                  文字格式
                </h6>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="primary"
                >
                  粗體
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="primary"
                >
                  斜體
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="primary"
                >
                  底線
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="primary"
                >
                  刪除線
                </VChip>
              </VCol>

              <VCol
                cols="12"
                sm="6"
              >
                <h6 class="text-h6 mb-2">
                  標題等級
                </h6>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="secondary"
                >
                  H1
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="secondary"
                >
                  H2
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="secondary"
                >
                  H3
                </VChip>
              </VCol>

              <VCol
                cols="12"
                sm="6"
              >
                <h6 class="text-h6 mb-2">
                  列表和引用
                </h6>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="success"
                >
                  無序列表
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="success"
                >
                  有序列表
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="success"
                >
                  引用塊
                </VChip>
              </VCol>

              <VCol
                cols="12"
                sm="6"
              >
                <h6 class="text-h6 mb-2">
                  其他功能
                </h6>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="warning"
                >
                  文字顏色
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="warning"
                >
                  高亮
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="warning"
                >
                  連結
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="warning"
                >
                  圖片
                </VChip>
                <VChip
                  size="small"
                  class="me-1 mb-1"
                  color="warning"
                >
                  程式碼
                </VChip>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.code-preview {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  padding: 12px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  white-space: pre-wrap;
  word-break: break-all;
  max-block-size: 300px;
  overflow-y: auto;
}

.v-chip {
  --v-chip-size: 0.75rem;
}
</style>

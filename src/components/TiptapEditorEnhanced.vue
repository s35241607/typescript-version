<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'

// 類型定義
interface MentionUser {
  id: string | number
  name: string
  avatar?: string
  email?: string
}

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  height?: string | number
  showToolbar?: boolean
  mentionUsers?: MentionUser[]
  enableMention?: boolean
  enableImageResize?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'ready', editor: Editor): void
  (e: 'mention', user: MentionUser): void
}

// Props 和 Emits
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '開始輸入內容...',
  disabled: false,
  height: '300px',
  showToolbar: true,
  mentionUsers: () => [],
  enableMention: false,
  enableImageResize: true,
})

const emit = defineEmits<Emits>()

// Vuetify 主題
const theme = useTheme()

// 編輯器實例
const editorInstance = ref<Editor | null>(null)

// 狀態管理
const imageDialogVisible = ref(false)
const imageUrl = ref('')
const linkDialogVisible = ref(false)
const linkUrl = ref('')
const linkText = ref('')

// Mention 狀態
const mentionSuggestions = ref<MentionUser[]>([])

// 顏色選項
const textColors = [
  '#000000',
  '#E53E3E',
  '#38A169',
  '#3182CE',
  '#805AD5',
  '#D69E2E',
  '#DD6B20',
  '#718096',
  '#9C27B0',
  '#F44336',
]

const highlightColors = [
  '#FFEB3B',
  '#4CAF50',
  '#2196F3',
  '#FF5722',
  '#9C27B0',
  '#FFC107',
  '#FF9800',
  '#795548',
  '#607D8B',
  '#CDDC39',
]

// Mention 建議渲染器
const mentionSuggestionRenderer = () => ({
  onStart: (props: any) => {
    mentionSuggestions.value = props.items
  },
  onUpdate(props: any) {
    mentionSuggestions.value = props.items
  },
  onKeyDown(props: any) {
    if (props.event.key === 'Escape') {
      props.command({ id: null, label: null })

      return true
    }

    return false
  },
  onExit() {
    mentionSuggestions.value = []
  },
})

// 編輯器初始化
const initEditor = () => {
  const extensions = [
    StarterKit,
    Underline,
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'tiptap-image',
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'tiptap-link',
      },
    }),
    TextStyle,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ]

  // 如果啟用 mention 功能，添加 Mention 擴展
  if (props.enableMention) {
    extensions.push(
      Mention.configure({
        HTMLAttributes: {
          class: 'tiptap-mention',
        },
        suggestion: {
          items: ({ query }: { query: string }) => {
            return props.mentionUsers
              .filter(user =>
                user.name.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 5)
          },
          render: mentionSuggestionRenderer,
        },
      }),
    )
  }

  editorInstance.value = new Editor({
    content: props.modelValue,
    editable: !props.disabled,
    extensions,
    onUpdate: ({ editor: editorRef }) => {
      const html = editorRef.getHTML()

      emit('update:modelValue', html)
    },
    onCreate: ({ editor: editorRef }) => {
      emit('ready', editorRef)
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        style: `min-height: ${typeof props.height === 'number' ? `${props.height}px` : props.height}`,
      },
    },
  })
}

// 監聽外部值變化
watch(
  () => props.modelValue,
  newValue => {
    if (editorInstance.value && editorInstance.value.getHTML() !== newValue)
      editorInstance.value.commands.setContent(newValue || '', false)
  },
)

// 監聽禁用狀態
watch(
  () => props.disabled,
  disabled => {
    if (editorInstance.value)
      editorInstance.value.setEditable(!disabled)
  },
)

// 工具欄操作函數
const toggleBold = () => editorInstance.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editorInstance.value?.chain().focus().toggleItalic().run()
const toggleUnderline = () => editorInstance.value?.chain().focus().toggleUnderline().run()
const toggleStrike = () => editorInstance.value?.chain().focus().toggleStrike().run()
const toggleCode = () => editorInstance.value?.chain().focus().toggleCode().run()

const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  editorInstance.value?.chain().focus().toggleHeading({ level }).run()
}

const toggleBulletList = () => editorInstance.value?.chain().focus().toggleBulletList().run()
const toggleOrderedList = () => editorInstance.value?.chain().focus().toggleOrderedList().run()
const toggleBlockquote = () => editorInstance.value?.chain().focus().toggleBlockquote().run()
const toggleCodeBlock = () => editorInstance.value?.chain().focus().toggleCodeBlock().run()

const setTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
  editorInstance.value?.chain().focus().setTextAlign(alignment).run()
}

const setTextColor = (color: string) => {
  editorInstance.value?.chain().focus().setColor(color).run()
}

const setHighlightColor = (color: string) => {
  editorInstance.value?.chain().focus().setHighlight({ color }).run()
}

const clearFormatting = () => {
  editorInstance.value?.chain().focus().unsetAllMarks().run()
}

// 圖片處理函數
const openImageDialog = () => {
  imageUrl.value = ''
  imageDialogVisible.value = true
}

const insertImageFromUrl = () => {
  if (imageUrl.value && editorInstance.value) {
    editorInstance.value.chain().focus().setImage({ src: imageUrl.value }).run()
    imageDialogVisible.value = false
    imageUrl.value = ''
  }
}

const insertImageFromFile = () => {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = false

  input.onchange = () => {
    const file = input.files?.[0]
    if (file && editorInstance.value) {
      const reader = new FileReader()

      reader.onload = e => {
        const base64 = e.target?.result as string

        editorInstance.value?.chain().focus().setImage({ src: base64 }).run()
      }
      reader.readAsDataURL(file)
    }
  }

  input.click()
}

// 連結處理函數
const openLinkDialog = () => {
  const selection = editorInstance.value?.state.selection

  linkText.value = editorInstance.value?.state.doc.textBetween(selection?.from || 0, selection?.to || 0) || ''
  linkUrl.value = ''
  linkDialogVisible.value = true
}

const insertLink = () => {
  if (linkUrl.value && editorInstance.value) {
    if (linkText.value)
      editorInstance.value.chain().focus().insertContent(`<a href="${linkUrl.value}">${linkText.value}</a>`).run()
    else
      editorInstance.value.chain().focus().setLink({ href: linkUrl.value }).run()

    linkDialogVisible.value = false
    linkUrl.value = ''
    linkText.value = ''
  }
}

const removeLink = () => {
  editorInstance.value?.chain().focus().unsetLink().run()
}

// 狀態檢查函數
const isActive = (name: string, attrs?: Record<string, any>) => {
  return editorInstance.value?.isActive(name, attrs) ?? false
}

// 計算樣式類別
const editorClasses = computed(() => ({
  'tiptap-editor': true,
  'tiptap-editor--disabled': props.disabled,
  'tiptap-editor--dark': theme.global.current.value.dark,
}))

// 組件初始化
initEditor()

// 組件銷毀時清理
onBeforeUnmount(() => {
  if (editorInstance.value)
    editorInstance.value.destroy()
})

// 暴露編輯器實例
defineExpose({
  getEditor: () => editorInstance.value,
  getHTML: () => editorInstance.value?.getHTML(),
  getText: () => editorInstance.value?.getText(),
  setContent: (content: string) => editorInstance.value?.commands.setContent(content),
  focus: () => editorInstance.value?.chain().focus().run(),
})
</script>

<template>
  <div :class="editorClasses">
    <!-- 工具欄 -->
    <VCard
      v-if="showToolbar"
      flat
      class="tiptap-toolbar"
      data-activity="tiptap-toolbar"
    >
      <VCardText class="pa-3">
        <VRow no-gutters>
          <!-- 標題等級 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VBtnToggle
              variant="outlined"
              size="small"
              density="compact"
            >
              <VTooltip
                v-for="level in [1, 2, 3]"
                :key="level"
                location="top"
              >
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('heading', { level }) ? 'primary' : undefined"
                    :data-activity="`heading-${level}`"
                    @click="setHeading(level as 1 | 2 | 3)"
                  >
                    H{{ level }}
                  </VBtn>
                </template>
                <span>標題 {{ level }}</span>
              </VTooltip>
            </VBtnToggle>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 文字樣式 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VBtnToggle
              variant="outlined"
              size="small"
              density="compact"
            >
              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('bold') ? 'primary' : undefined"
                    data-activity="toggle-bold"
                    @click="toggleBold"
                  >
                    <VIcon icon="ri-bold" />
                  </VBtn>
                </template>
                <span>粗體 (Ctrl+B)</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('italic') ? 'primary' : undefined"
                    data-activity="toggle-italic"
                    @click="toggleItalic"
                  >
                    <VIcon icon="ri-italic" />
                  </VBtn>
                </template>
                <span>斜體 (Ctrl+I)</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('underline') ? 'primary' : undefined"
                    data-activity="toggle-underline"
                    @click="toggleUnderline"
                  >
                    <VIcon icon="ri-underline" />
                  </VBtn>
                </template>
                <span>底線 (Ctrl+U)</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('strike') ? 'primary' : undefined"
                    data-activity="toggle-strike"
                    @click="toggleStrike"
                  >
                    <VIcon icon="ri-strikethrough" />
                  </VBtn>
                </template>
                <span>刪除線</span>
              </VTooltip>
            </VBtnToggle>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 文字顏色 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VMenu>
              <template #activator="{ props: menuProps }">
                <VTooltip location="top">
                  <template #activator="{ props: tooltipProps }">
                    <VBtn
                      v-bind="{ ...menuProps, ...tooltipProps }"
                      variant="outlined"
                      size="small"
                      density="compact"
                      data-activity="text-color-menu"
                    >
                      <VIcon
                        icon="ri-font-color"
                        class="me-1"
                      />
                      <VIcon
                        icon="ri-arrow-down-s-line"
                        size="small"
                      />
                    </VBtn>
                  </template>
                  <span>文字顏色</span>
                </VTooltip>
              </template>
              <VCard
                title="文字顏色"
                width="200"
              >
                <VCardText>
                  <div class="color-grid">
                    <VBtn
                      v-for="color in textColors"
                      :key="color"
                      :style="{ backgroundColor: color }"
                      size="small"
                      class="color-btn"
                      variant="flat"
                      :data-activity="`text-color-${color}`"
                      @click="setTextColor(color)"
                    />
                  </div>
                </VCardText>
              </VCard>
            </VMenu>

            <VMenu>
              <template #activator="{ props: menuProps }">
                <VTooltip location="top">
                  <template #activator="{ props: tooltipProps }">
                    <VBtn
                      v-bind="{ ...menuProps, ...tooltipProps }"
                      variant="outlined"
                      size="small"
                      density="compact"
                      data-activity="highlight-color-menu"
                    >
                      <VIcon
                        icon="ri-mark-pen-line"
                        class="me-1"
                      />
                      <VIcon
                        icon="ri-arrow-down-s-line"
                        size="small"
                      />
                    </VBtn>
                  </template>
                  <span>高亮顏色</span>
                </VTooltip>
              </template>
              <VCard
                title="高亮顏色"
                width="200"
              >
                <VCardText>
                  <div class="color-grid">
                    <VBtn
                      v-for="color in highlightColors"
                      :key="color"
                      :style="{ backgroundColor: color }"
                      size="small"
                      class="color-btn"
                      variant="flat"
                      :data-activity="`highlight-color-${color}`"
                      @click="setHighlightColor(color)"
                    />
                  </div>
                </VCardText>
              </VCard>
            </VMenu>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 對齊方式 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VBtnToggle
              variant="outlined"
              size="small"
              density="compact"
            >
              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('textAlign', { textAlign: 'left' }) ? 'primary' : undefined"
                    data-activity="align-left"
                    @click="setTextAlign('left')"
                  >
                    <VIcon icon="ri-align-left" />
                  </VBtn>
                </template>
                <span>靠左對齊</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('textAlign', { textAlign: 'center' }) ? 'primary' : undefined"
                    data-activity="align-center"
                    @click="setTextAlign('center')"
                  >
                    <VIcon icon="ri-align-center" />
                  </VBtn>
                </template>
                <span>置中對齊</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('textAlign', { textAlign: 'right' }) ? 'primary' : undefined"
                    data-activity="align-right"
                    @click="setTextAlign('right')"
                  >
                    <VIcon icon="ri-align-right" />
                  </VBtn>
                </template>
                <span>靠右對齊</span>
              </VTooltip>
            </VBtnToggle>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 列表和引用 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VBtnToggle
              variant="outlined"
              size="small"
              density="compact"
            >
              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('bulletList') ? 'primary' : undefined"
                    data-activity="toggle-bullet-list"
                    @click="toggleBulletList"
                  >
                    <VIcon icon="ri-list-unordered" />
                  </VBtn>
                </template>
                <span>無序列表</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('orderedList') ? 'primary' : undefined"
                    data-activity="toggle-ordered-list"
                    @click="toggleOrderedList"
                  >
                    <VIcon icon="ri-list-ordered" />
                  </VBtn>
                </template>
                <span>有序列表</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('blockquote') ? 'primary' : undefined"
                    data-activity="toggle-blockquote"
                    @click="toggleBlockquote"
                  >
                    <VIcon icon="ri-double-quotes-l" />
                  </VBtn>
                </template>
                <span>引用區塊</span>
              </VTooltip>
            </VBtnToggle>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 其他工具 -->
          <VCol
            cols="auto"
            class="me-2"
          >
            <VBtnToggle
              variant="outlined"
              size="small"
              density="compact"
            >
              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('code') ? 'primary' : undefined"
                    data-activity="toggle-code"
                    @click="toggleCode"
                  >
                    <VIcon icon="ri-code-line" />
                  </VBtn>
                </template>
                <span>行內程式碼</span>
              </VTooltip>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('codeBlock') ? 'primary' : undefined"
                    data-activity="toggle-code-block"
                    @click="toggleCodeBlock"
                  >
                    <VIcon icon="ri-code-box-line" />
                  </VBtn>
                </template>
                <span>程式碼區塊</span>
              </VTooltip>

              <!-- 圖片選單 -->
              <VMenu>
                <template #activator="{ props: menuProps }">
                  <VTooltip location="top">
                    <template #activator="{ props: tooltipProps }">
                      <VBtn
                        v-bind="{ ...menuProps, ...tooltipProps }"
                        data-activity="image-menu"
                      >
                        <VIcon
                          icon="ri-image-line"
                          class="me-1"
                        />
                        <VIcon
                          icon="ri-arrow-down-s-line"
                          size="small"
                        />
                      </VBtn>
                    </template>
                    <span>插入圖片</span>
                  </VTooltip>
                </template>
                <VList>
                  <VListItem
                    data-activity="insert-image-url"
                    @click="openImageDialog"
                  >
                    <template #prepend>
                      <VIcon icon="ri-link" />
                    </template>
                    <VListItemTitle>從 URL 插入</VListItemTitle>
                  </VListItem>
                  <VListItem
                    data-activity="insert-image-file"
                    @click="insertImageFromFile"
                  >
                    <template #prepend>
                      <VIcon icon="ri-upload-line" />
                    </template>
                    <VListItemTitle>上傳檔案</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>

              <VTooltip location="top">
                <template #activator="{ props: tooltipProps }">
                  <VBtn
                    v-bind="tooltipProps"
                    :color="isActive('link') ? 'primary' : undefined"
                    data-activity="toggle-link"
                    @click="isActive('link') ? removeLink() : openLinkDialog()"
                  >
                    <VIcon :icon="isActive('link') ? 'ri-link-unlink' : 'ri-link'" />
                  </VBtn>
                </template>
                <span>{{ isActive('link') ? '移除連結' : '插入連結' }}</span>
              </VTooltip>
            </VBtnToggle>
          </VCol>

          <VDivider
            vertical
            class="mx-2"
          />

          <!-- 清除格式 -->
          <VCol cols="auto">
            <VTooltip location="top">
              <template #activator="{ props: tooltipProps }">
                <VBtn
                  v-bind="tooltipProps"
                  variant="outlined"
                  size="small"
                  density="compact"
                  data-activity="clear-formatting"
                  @click="clearFormatting"
                >
                  <VIcon icon="ri-format-clear" />
                </VBtn>
              </template>
              <span>清除格式</span>
            </VTooltip>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- 編輯器內容區域 -->
    <VCard
      flat
      class="tiptap-content"
      :class="{ 'mt-0': showToolbar }"
    >
      <EditorContent
        :editor="editorInstance"
        class="tiptap-editor-wrapper"
        data-activity="tiptap-content"
      />
    </VCard>

    <!-- 圖片對話框 -->
    <VDialog
      v-model="imageDialogVisible"
      max-width="500"
      data-activity="image-dialog"
    >
      <VCard title="插入圖片">
        <VCardText>
          <VTextField
            v-model="imageUrl"
            label="圖片網址"
            placeholder="https://example.com/image.jpg"
            prepend-icon="ri-link"
            variant="outlined"
            data-activity="image-url-input"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            data-activity="image-dialog-cancel"
            @click="imageDialogVisible = false"
          >
            取消
          </VBtn>
          <VBtn
            color="primary"
            data-activity="image-dialog-confirm"
            @click="insertImageFromUrl"
          >
            插入
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- 連結對話框 -->
    <VDialog
      v-model="linkDialogVisible"
      max-width="500"
      data-activity="link-dialog"
    >
      <VCard title="插入連結">
        <VCardText>
          <VTextField
            v-model="linkText"
            label="連結文字"
            placeholder="連結顯示的文字"
            prepend-icon="ri-text"
            variant="outlined"
            class="mb-4"
            data-activity="link-text-input"
          />
          <VTextField
            v-model="linkUrl"
            label="連結網址"
            placeholder="https://example.com"
            prepend-icon="ri-link"
            variant="outlined"
            data-activity="link-url-input"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            data-activity="link-dialog-cancel"
            @click="linkDialogVisible = false"
          >
            取消
          </VBtn>
          <VBtn
            color="primary"
            data-activity="link-dialog-confirm"
            @click="insertLink"
          >
            插入
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss">
.tiptap-editor {
  .tiptap-toolbar {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px 8px 0 0;
  }

  .tiptap-content {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 0 0 8px 8px;

    &.mt-0 {
      border-block-start: none;
    }
  }

  &--disabled {
    .tiptap-content {
      background-color: rgba(var(--v-theme-on-surface), 0.02);
    }
  }
}

.tiptap-editor-wrapper {
  .tiptap-editor-content {
    padding: 16px;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    color: rgb(var(--v-theme-on-surface));

    /* 標題樣式 */
    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1.1em; }
    h5 { font-size: 1em; }
    h6 { font-size: 0.9em; }

    h1, h2, h3, h4, h5, h6 {
      color: rgb(var(--v-theme-on-surface));
      font-weight: 600;
      margin-block: 1em 0.5em;

      &:first-child {
        margin-block-start: 0;
      }
    }

    /* 段落樣式 */
    p {
      margin-block: 0.5em;
      margin-inline: 0;

      &:first-child {
        margin-block-start: 0;
      }

      &:last-child {
        margin-block-end: 0;
      }
    }

    /* 列表樣式 */
    ul, ol {
      padding-inline-start: 1.5em;
      margin-block: 0.5em;
      margin-inline: 0;

      li {
        margin-block: 0.25em;
        margin-inline: 0;

        p {
          margin: 0;
        }
      }
    }

    /* 引用樣式 */
    blockquote {
      border-inline-start: 4px solid rgb(var(--v-theme-primary));
      background: rgba(var(--v-theme-primary), 0.05);
      padding: 1em;
      margin-block: 1em;
      margin-inline: 0;
      border-radius: 0 8px 8px 0;

      p {
        margin: 0;
      }
    }

    /* 代碼樣式 */
    code {
      background: rgba(var(--v-theme-on-surface), 0.1);
      padding-block: 0.25em;
      padding-inline: 0.5em;
      border-radius: 4px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.9em;
    }

    pre {
      background: rgba(var(--v-theme-on-surface), 0.05);
      border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      border-radius: 8px;
      padding: 1em;
      overflow-x: auto;
      margin-block: 1em;
      margin-inline: 0;

      code {
        background: none;
        padding: 0;
        border-radius: 0;
      }
    }

    /* 圖片樣式 */
    .tiptap-image {
      max-inline-size: 100%;
      block-size: auto;
      border-radius: 8px;
      margin-block: 0.5em;
      margin-inline: 0;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    /* 連結樣式 */
    .tiptap-link {
      color: rgb(var(--v-theme-primary));
      text-decoration: none;
      border-block-end: 1px solid transparent;
      transition: border-color 0.2s ease;

      &:hover {
        border-block-end-color: rgb(var(--v-theme-primary));
      }
    }

    /* Mention 樣式 */
    .tiptap-mention {
      background: rgba(var(--v-theme-primary), 0.1);
      color: rgb(var(--v-theme-primary));
      padding-block: 0.1em;
      padding-inline: 0.3em;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        background: rgba(var(--v-theme-primary), 0.2);
      }
    }

    /* 高亮樣式 */
    mark {
      border-radius: 3px;
      padding-block: 0.1em;
      padding-inline: 0.2em;
    }

    /* 占位符樣式 */
    &.is-empty::before {
      color: rgba(var(--v-theme-on-surface), 0.6);
      content: attr(data-placeholder);
      float: inline-start;
      block-size: 0;
      pointer-events: none;
    }

    /* 選擇樣式 */
    ::selection {
      background: rgba(var(--v-theme-primary), 0.2);
    }
  }
}

/* 顏色選擇器 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  inline-size: 160px;

  .color-btn {
    inline-size: 24px !important;
    block-size: 24px !important;
    min-inline-size: 24px !important;
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}

/* 暗色主題調整 */
[data-theme="dark"] {
  .tiptap-editor-wrapper {
    .tiptap-editor-content {
      pre {
        background: rgba(var(--v-theme-surface-bright), 0.8);
      }

      blockquote {
        background: rgba(var(--v-theme-primary), 0.1);
      }
    }
  }
}
</style>

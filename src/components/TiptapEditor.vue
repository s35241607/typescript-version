<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'

// 類型定義
interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  height?: string | number
  showToolbar?: boolean
  mentionUsers?: Array<{ id: string | number; name: string; avatar?: string; email?: string }>
  enableMention?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'ready', editor: any): void
  (e: 'mention', user: any): void
}

// Props 和 Emits
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Type something...',
  disabled: false,
  height: '200px',
  showToolbar: true,
  mentionUsers: () => [],
  enableMention: false,
})

const emit = defineEmits<Emits>()

// Vuetify 主題
const theme = useTheme()

// 編輯器實例
const editor = ref<Editor | null>(null)

// 格式選擇
const currentFormat = ref('paragraph')

const formatOptions = [
  { title: 'Normal', value: 'paragraph' },
  { title: 'Heading 1', value: 'heading1' },
  { title: 'Heading 2', value: 'heading2' },
  { title: 'Heading 3', value: 'heading3' },
  { title: 'Heading 4', value: 'heading4' },
  { title: 'Heading 5', value: 'heading5' },
  { title: 'Heading 6', value: 'heading6' },
]

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
  '#E53E3E',
  '#38A169',
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
  '#F44336',
]

// 編輯器初始化
const initEditor = () => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: !props.disabled,
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
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
    ],
    onUpdate: ({ editor: editorInstance }) => {
      const html = editorInstance.getHTML()

      emit('update:modelValue', html)
    },
    onCreate: ({ editor: editorInstance }) => {
      emit('ready', editorInstance)
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
    if (editor.value && editor.value.getHTML() !== newValue)
      editor.value.commands.setContent(newValue, { emitUpdate: false })
  },
)

// 監聽禁用狀態
watch(
  () => props.disabled,
  disabled => {
    if (editor.value)
      editor.value.setEditable(!disabled)
  },
)

// 工具欄操作函數
const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run()
const toggleUnderline = () => editor.value?.chain().focus().toggleUnderline().run()
const toggleStrike = () => editor.value?.chain().focus().toggleStrike().run()
const toggleCode = () => editor.value?.chain().focus().toggleCode().run()

const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  editor.value?.chain().focus().toggleHeading({ level }).run()
}

// 處理格式變更
function handleFormatChange(format: string) {
  if (!editor.value)
    return

  const formatActions = {
    paragraph: () => editor.value?.chain().focus().setParagraph().run(),
    heading1: () => setHeading(1),
    heading2: () => setHeading(2),
    heading3: () => setHeading(3),
    heading4: () => setHeading(4),
    heading5: () => setHeading(5),
    heading6: () => setHeading(6),
  }

  const action = formatActions[format as keyof typeof formatActions]
  if (action)
    action()
}

const toggleBulletList = () => editor.value?.chain().focus().toggleBulletList().run()
const toggleOrderedList = () => editor.value?.chain().focus().toggleOrderedList().run()
const toggleBlockquote = () => editor.value?.chain().focus().toggleBlockquote().run()
const toggleCodeBlock = () => editor.value?.chain().focus().toggleCodeBlock().run()

const setTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
  editor.value?.chain().focus().setTextAlign(alignment).run()
}

const setTextColor = (color: string) => {
  editor.value?.chain().focus().setColor(color).run()
}

const setHighlightColor = (color: string) => {
  editor.value?.chain().focus().setHighlight({ color }).run()
}

const clearFormatting = () => {
  editor.value?.chain().focus().unsetAllMarks().run()
}

// 插入圖片
function insertImage() {
  // 可以改為使用文件上傳對話框或其他 UI 元件
  // eslint-disable-next-line no-alert
  const url = window.prompt && window.prompt('Enter image URL:')
  if (url)
    editor.value?.chain().focus().setImage({ src: url }).run()
}

// 插入連結
function insertLink() {
  // 可以改為使用自定義對話框
  // eslint-disable-next-line no-alert
  const url = window.prompt && window.prompt('Enter URL:')
  if (url)
    editor.value?.chain().focus().setLink({ href: url }).run()
}

// 移除連結
const removeLink = () => {
  editor.value?.chain().focus().unsetLink().run()
}

// 狀態檢查函數
const isActive = (name: string, attrs?: Record<string, any>) => {
  return editor.value?.isActive(name, attrs) ?? false
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
  if (editor.value)
    editor.value.destroy()
})

// 暴露編輯器實例
defineExpose({
  getEditor: () => editor.value,
  getHTML: () => editor.value?.getHTML(),
  getText: () => editor.value?.getText(),
  setContent: (content: string) => editor.value?.commands.setContent(content),
  focus: () => editor.value?.chain().focus().run(),
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
      <VCardText class="pa-2">
        <div class="d-flex align-center flex-wrap ga-1">
          <!-- 格式下拉選單 -->
          <VSelect
            v-model="currentFormat"
            :items="formatOptions"
            variant="outlined"
            density="compact"
            hide-details
            class="format-select me-2"
            data-activity="format-select"
            @update:model-value="handleFormatChange"
          />

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 基本格式按鈕 -->
          <VBtn
            :color="isActive('bold') ? 'primary' : undefined"
            :variant="isActive('bold') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-bold"
            @click="toggleBold"
          >
            <VIcon icon="ri-bold" />
          </VBtn>
          <VBtn
            :color="isActive('italic') ? 'primary' : undefined"
            :variant="isActive('italic') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-italic"
            @click="toggleItalic"
          >
            <VIcon icon="ri-italic" />
          </VBtn>
          <VBtn
            :color="isActive('underline') ? 'primary' : undefined"
            :variant="isActive('underline') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-underline"
            @click="toggleUnderline"
          >
            <VIcon icon="ri-underline" />
          </VBtn>
          <VBtn
            :color="isActive('strike') ? 'primary' : undefined"
            :variant="isActive('strike') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-strike"
            @click="toggleStrike"
          >
            <VIcon icon="ri-strikethrough" />
          </VBtn>

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 文字顏色 -->
          <VMenu location="bottom">
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                variant="text"
                size="small"
                density="comfortable"
                data-activity="text-color-menu"
              >
                <VIcon icon="ri-font-color" />
              </VBtn>
            </template>
            <VCard>
              <VCardText class="pa-2">
                <div class="color-grid">
                  <VBtn
                    v-for="color in textColors"
                    :key="color"
                    :style="{ backgroundColor: color }"
                    size="x-small"
                    class="color-btn ma-1"
                    :data-activity="`text-color-${color}`"
                    @click="setTextColor(color)"
                  />
                </div>
              </VCardText>
            </VCard>
          </VMenu>

          <VMenu location="bottom">
            <template #activator="{ props: menuProps }">
              <VBtn
                v-bind="menuProps"
                variant="text"
                size="small"
                density="comfortable"
                data-activity="highlight-color-menu"
              >
                <VIcon icon="ri-mark-pen-line" />
              </VBtn>
            </template>
            <VCard>
              <VCardText class="pa-2">
                <div class="color-grid">
                  <VBtn
                    v-for="color in highlightColors"
                    :key="color"
                    :style="{ backgroundColor: color }"
                    size="x-small"
                    class="color-btn ma-1"
                    :data-activity="`highlight-color-${color}`"
                    @click="setHighlightColor(color)"
                  />
                </div>
              </VCardText>
            </VCard>
          </VMenu>

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 對齊按鈕 -->
          <VBtn
            :color="isActive('textAlign', { textAlign: 'left' }) ? 'primary' : undefined"
            :variant="isActive('textAlign', { textAlign: 'left' }) ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="align-left"
            @click="setTextAlign('left')"
          >
            <VIcon icon="ri-align-left" />
          </VBtn>
          <VBtn
            :color="isActive('textAlign', { textAlign: 'center' }) ? 'primary' : undefined"
            :variant="isActive('textAlign', { textAlign: 'center' }) ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="align-center"
            @click="setTextAlign('center')"
          >
            <VIcon icon="ri-align-center" />
          </VBtn>
          <VBtn
            :color="isActive('textAlign', { textAlign: 'right' }) ? 'primary' : undefined"
            :variant="isActive('textAlign', { textAlign: 'right' }) ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="align-right"
            @click="setTextAlign('right')"
          >
            <VIcon icon="ri-align-right" />
          </VBtn>
          <VBtn
            :color="isActive('textAlign', { textAlign: 'justify' }) ? 'primary' : undefined"
            :variant="isActive('textAlign', { textAlign: 'justify' }) ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="align-justify"
            @click="setTextAlign('justify')"
          >
            <VIcon icon="ri-align-justify" />
          </VBtn>

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 列表按鈕 -->
          <VBtn
            :color="isActive('bulletList') ? 'primary' : undefined"
            :variant="isActive('bulletList') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-bullet-list"
            @click="toggleBulletList"
          >
            <VIcon icon="ri-list-unordered" />
          </VBtn>
          <VBtn
            :color="isActive('orderedList') ? 'primary' : undefined"
            :variant="isActive('orderedList') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-ordered-list"
            @click="toggleOrderedList"
          >
            <VIcon icon="ri-list-ordered" />
          </VBtn>

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 其他工具 -->
          <VBtn
            :color="isActive('blockquote') ? 'primary' : undefined"
            :variant="isActive('blockquote') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-blockquote"
            @click="toggleBlockquote"
          >
            <VIcon icon="ri-double-quotes-l" />
          </VBtn>
          <VBtn
            :color="isActive('code') ? 'primary' : undefined"
            :variant="isActive('code') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-code"
            @click="toggleCode"
          >
            <VIcon icon="ri-code-line" />
          </VBtn>
          <VBtn
            :color="isActive('codeBlock') ? 'primary' : undefined"
            :variant="isActive('codeBlock') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            data-activity="toggle-code-block"
            @click="toggleCodeBlock"
          >
            <VIcon icon="ri-code-box-line" />
          </VBtn>
          <VBtn
            variant="text"
            size="small"
            density="comfortable"
            data-activity="insert-image"
            @click="insertImage"
          >
            <VIcon icon="ri-image-line" />
          </VBtn>
          <VBtn
            :color="isActive('link') ? 'primary' : undefined"
            :variant="isActive('link') ? 'flat' : 'text'"
            size="small"
            density="comfortable"
            :data-activity="isActive('link') ? 'remove-link' : 'insert-link'"
            @click="isActive('link') ? removeLink() : insertLink()"
          >
            <VIcon :icon="isActive('link') ? 'ri-link-unlink' : 'ri-link'" />
          </VBtn>

          <VDivider
            vertical
            class="mx-1 toolbar-divider"
          />

          <!-- 清除格式 -->
          <VBtn
            variant="text"
            size="small"
            density="comfortable"
            data-activity="clear-formatting"
            @click="clearFormatting"
          >
            <VIcon icon="ri-format-clear" />
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <!-- 編輯器內容區域 -->
    <VCard
      flat
      class="tiptap-content"
      :class="{ 'mt-0': showToolbar }"
    >
      <EditorContent
        v-if="editor"
        :editor="editor as any"
        class="tiptap-editor-wrapper"
        data-activity="tiptap-content"
      />
    </VCard>
  </div>
</template>

<style lang="scss">
.tiptap-editor {
  .tiptap-toolbar {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px 8px 0 0;
    background-color: rgba(var(--v-theme-surface), 1);
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

// 工具列樣式
.format-select {
  min-inline-size: 100px;
  max-inline-size: 120px;
}

.toolbar-divider {
  block-size: 24px;
}

.tiptap-editor-wrapper {
  .tiptap-editor-content {
    padding: 16px;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    color: rgb(var(--v-theme-on-surface));

    // 基本元素樣式重置
    * {
      box-sizing: border-box;
    }

    // 段落樣式
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

    /* 列表樣式 */
    ul, ol {
      padding-inline-start: 1.5em;
      margin-block: 0.5em;
      margin-inline: 0;
    }

    li {
      margin-block: 0.25em;
      margin-inline: 0;
    }

    /* 引用樣式 */
    blockquote {
      border-inline-start: 4px solid rgb(var(--v-theme-primary));
      background: rgba(var(--v-theme-primary), 0.05);
      padding: 1em;
      margin-block: 1em;
      margin-inline: 0;
      border-radius: 0 8px 8px 0;
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
    img {
      max-inline-size: 100%;
      block-size: auto;
      border-radius: 8px;
      margin-block: 0.5em;
      margin-inline: 0;
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
  gap: 6px;
  inline-size: 140px;

  .color-btn {
    inline-size: 24px !important;
    block-size: 24px !important;
    min-inline-size: 24px !important;
    border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0 0 0 / 15%);
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

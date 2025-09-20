<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  modelValue?: string
  config?: Record<string, any>
  disabled?: boolean
  placeholder?: string
  height?: string | number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'ready', editor: any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  config: () => ({}),
  disabled: false,
  placeholder: '請輸入內容...',
  height: '300px',
})

const emit = defineEmits<Emits>()

// 編輯器引用
const quillRef = ref()

// Vuetify 主題
const theme = useTheme()

// 內部值
const internalValue = ref(props.modelValue)

// 圖片上傳處理器
const imageHandler = () => {
  const editor = quillRef.value?.getQuill()
  if (!editor)
    return

  // 建立檔案輸入元素
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = false

  input.onchange = () => {
    const file = input.files?.[0]
    if (file) {
      // 將圖片轉換為 base64
      const reader = new FileReader()

      reader.onload = e => {
        const base64 = e.target?.result as string
        const range = editor.getSelection()

        editor.insertEmbed(range?.index || 0, 'image', base64)
      }
      reader.readAsDataURL(file)
    }
  }

  input.click()
}

// 編輯器配置選項
const editorOptions = computed(() => {
  const isDark = theme.global.current.value.dark

  return {
    theme: 'snow',
    modules: {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      keyboard: {
        bindings: {
          // 支援 Ctrl+V 貼上圖片
          paste: {
            key: 'V',
            ctrlKey: true,
            handler: () => {
              // 讓預設的貼上行為處理文字
              return true
            },
          },
        },
      },
    },
    placeholder: props.placeholder,
    readOnly: props.disabled,
    formats: [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'color',
      'background',
      'align',
      'list',
      'indent',
      'blockquote',
      'code-block',
      'link',
      'image',
    ],
    ...props.config,
  }
})

// 監聽外部值變化
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== internalValue.value)
      internalValue.value = newValue
  },
)

// 處理內容變化
const handleContentChange = (content: string) => {
  internalValue.value = content
  emit('update:modelValue', content)
}

// 更新編輯器主題
const updateEditorTheme = (editor: any, isDark: boolean) => {
  const container = editor.container
  if (isDark) {
    container.classList.add('quill-dark-theme')
    container.classList.remove('quill-light-theme')
  }
  else {
    container.classList.add('quill-light-theme')
    container.classList.remove('quill-dark-theme')
  }
}

// 編輯器準備就緒
const onEditorReady = (editor: any) => {
  // 設定編輯器高度
  const editorElement = editor.container.querySelector('.ql-editor')
  if (editorElement) {
    editorElement.style.minHeight = typeof props.height === 'number'
      ? `${props.height}px`
      : props.height
  }

  // 監聽主題變化並更新編輯器樣式
  watch(
    () => theme.global.current.value.dark,
    isDark => {
      updateEditorTheme(editor, isDark)
    },
    { immediate: true },
  )

  // 支援圖片拖放和貼上
  editor.root.addEventListener('paste', (e: ClipboardEvent) => {
    const clipboardData = e.clipboardData
    if (clipboardData) {
      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.includes('image')) {
          e.preventDefault()

          const file = item.getAsFile()
          if (file) {
            const reader = new FileReader()

            reader.onload = event => {
              const base64 = event.target?.result as string
              const range = editor.getSelection()

              editor.insertEmbed(range?.index || 0, 'image', base64)
            }
            reader.readAsDataURL(file)
          }
          break
        }
      }
    }
  })

  emit('ready', editor)
}

// 組件掛載時初始化
onMounted(() => {
  internalValue.value = props.modelValue
})

// 暴露編輯器實例
defineExpose({
  getQuill: () => quillRef.value?.getQuill(),
  getHTML: () => quillRef.value?.getHTML(),
  getText: () => quillRef.value?.getText(),
  setHTML: (html: string) => quillRef.value?.setHTML(html),
})
</script>

<template>
  <div class="quill-editor-wrapper">
    <QuillEditor
      ref="quillRef"
      v-model:content="internalValue"
      :options="editorOptions"
      :placeholder="placeholder"
      :disabled="disabled"
      content-type="html"
      @update:content="handleContentChange"
      @ready="onEditorReady"
    />
  </div>
</template>

<style lang="scss" scoped>
.quill-editor-wrapper {
  :deep(.ql-toolbar) {
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px 8px 0 0;
    background: rgb(var(--v-theme-surface));
  }

  :deep(.ql-container) {
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 0 0 8px 8px;
    font-family: inherit;
    font-size: 14px;
    background: rgb(var(--v-theme-surface));
  }

  :deep(.ql-editor) {
    color: rgb(var(--v-theme-on-surface));
    min-height: 150px;

    &.ql-blank::before {
      color: rgba(var(--v-theme-on-surface), 0.6);
      font-style: normal;
    }

    h1, h2, h3, h4, h5, h6 {
      color: rgb(var(--v-theme-on-surface));
    }

    p, ul, ol, blockquote {
      color: rgb(var(--v-theme-on-surface));
    }

    .ql-code-block {
      background: rgba(var(--v-theme-on-surface), 0.05);
      border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      border-radius: 4px;
      color: rgb(var(--v-theme-on-surface));
    }

    blockquote {
      border-left: 4px solid rgb(var(--v-theme-primary));
      background: rgba(var(--v-theme-primary), 0.05);
      color: rgb(var(--v-theme-on-surface));
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
  }

  :deep(.ql-snow) {
    .ql-stroke {
      stroke: rgb(var(--v-theme-on-surface));
    }

    .ql-fill {
      fill: rgb(var(--v-theme-on-surface));
    }

    .ql-picker-options {
      background: rgb(var(--v-theme-surface));
      border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .ql-picker-item {
      color: rgb(var(--v-theme-on-surface));

      &:hover {
        background: rgba(var(--v-theme-primary), 0.1);
      }
    }

    .ql-tooltip {
      background: rgb(var(--v-theme-surface));
      border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      color: rgb(var(--v-theme-on-surface));

      input {
        background: rgb(var(--v-theme-surface));
        color: rgb(var(--v-theme-on-surface));
        border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
      }

      .ql-preview {
        color: rgb(var(--v-theme-primary));
      }
    }
  }

  // 暗色主題特殊處理
  :deep([data-theme="dark"]) {
    .ql-toolbar {
      .ql-stroke {
        stroke: rgb(var(--v-theme-on-surface));
      }

      .ql-fill {
        fill: rgb(var(--v-theme-on-surface));
      }

      button:hover {
        background: rgba(var(--v-theme-on-surface), 0.1);
      }

      .ql-active {
        background: rgba(var(--v-theme-primary), 0.2);
      }
    }
  }

  // 暗色主題特殊處理
  &.quill-dark-theme :deep(.ql-toolbar) {
    background: rgb(var(--v-theme-surface-bright));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));

    .ql-stroke {
      stroke: rgb(var(--v-theme-on-surface));
    }

    .ql-fill {
      fill: rgb(var(--v-theme-on-surface));
    }

    button:hover {
      background: rgba(var(--v-theme-on-surface), 0.1);
    }

    .ql-active {
      background: rgba(var(--v-theme-primary), 0.2);
    }
  }

  &.quill-dark-theme :deep(.ql-container) {
    background: rgb(var(--v-theme-surface-bright));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }

  &.quill-dark-theme :deep(.ql-editor) {
    background: rgb(var(--v-theme-surface-bright));
    color: rgb(var(--v-theme-on-surface));
  }

  // 淺色主題處理
  &.quill-light-theme :deep(.ql-toolbar) {
    background: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }

  &.quill-light-theme :deep(.ql-container) {
    background: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>

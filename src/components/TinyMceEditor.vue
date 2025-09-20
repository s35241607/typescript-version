<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'

interface Props {
  modelValue?: string
  config?: Record<string, any>
  disabled?: boolean
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  config: () => ({}),
  disabled: false,
  placeholder: '請輸入內容...',
})

const emit = defineEmits<Emits>()

// 編輯器引用
const editorRef = ref()

// 預設配置
const defaultConfig = {
  height: 300,
  menubar: false,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount',
  ],
  toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px }',
  skin: 'oxide',
  content_css: 'default',
  placeholder: '請輸入內容...',
  setup: (editor: any) => {
    editor.on('init', () => {
      // 編輯器初始化完成
    })
  },
}

// 合併配置
const mergedConfig = computed(() => ({
  ...defaultConfig,
  ...props.config,
  placeholder: props.placeholder,
}))

// 內部值
const internalValue = ref(props.modelValue)

// 監聽外部值變化
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== internalValue.value)
      internalValue.value = newValue
  },
)

// 處理內容變化
const handleInput = (content: string) => {
  internalValue.value = content
  emit('update:modelValue', content)
}

// 組件掛載時初始化
onMounted(() => {
  internalValue.value = props.modelValue
})
</script>

<template>
  <div class="tinymce-editor-wrapper">
    <Editor
      ref="editorRef"
      :model-value="internalValue"
      :init="mergedConfig"
      :disabled="disabled"
      @update:model-value="handleInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.tinymce-editor-wrapper {
  :deep(.tox) {
    .tox-editor-header {
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    }

    .tox-edit-area {
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    }

    .tox-toolbar__group {
      border-color: rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }

  :deep(.tox-tinymce) {
    border-radius: 8px;
    border-color: rgba(var(--v-border-color), var(--v-border-opacity));

    &.tox-tinymce--toolbar-sticky-on {
      .tox-editor-header {
        border-radius: 8px 8px 0 0;
      }
    }
  }

  :deep(.tox-edit-area__iframe) {
    border-radius: 0 0 8px 8px;
  }
}
</style>

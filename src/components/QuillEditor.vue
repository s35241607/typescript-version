<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { nextTick } from 'vue'
import { useTheme } from 'vuetify'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  modelValue?: string
  config?: Record<string, any>
  disabled?: boolean
  placeholder?: string
  height?: string | number
  mentionUsers?: Array<{ id: string | number; name: string; avatar?: string; email?: string }>
  enableMention?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'ready', editor: any): void
  (e: 'mention', user: any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  config: () => ({}),
  disabled: false,
  placeholder: '請輸入內容...',
  height: '300px',
  mentionUsers: () => [],
  enableMention: true,
})

const emit = defineEmits<Emits>()

// 編輯器引用
const quillRef = ref()

// Vuetify 主題
const theme = useTheme()

// 內部值
const internalValue = ref(props.modelValue)

// Mention 相關狀態
const showMentionList = ref(false)
const mentionPosition = ref({ top: 0, left: 0 })
const mentionQuery = ref('')
const selectedMentionIndex = ref(0)
const mentionRange = ref<{ index: number; length: number } | null>(null)

// 過濾 mention 用戶列表
const filteredMentionUsers = computed(() => {
  if (!props.enableMention) {
    return []
  }
  
  if (!mentionQuery.value || mentionQuery.value.trim() === '') {
    return props.mentionUsers.slice(0, 5) // 顯示前5個用戶
  }
  
  const query = mentionQuery.value.toLowerCase()
  return props.mentionUsers
    .filter(user => 
      user.name.toLowerCase().includes(query) ||
      (user.email && user.email.toLowerCase().includes(query))
    )
    .slice(0, 5)
})

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

// Mention 相關函數
const handleMentionKeydown = (e: KeyboardEvent) => {
  if (!showMentionList.value) return false

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedMentionIndex.value = Math.min(
      selectedMentionIndex.value + 1,
      filteredMentionUsers.value.length - 1
    )
    scrollToSelectedItem()
    return false
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedMentionIndex.value = Math.max(selectedMentionIndex.value - 1, 0)
    scrollToSelectedItem()
    return false
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    console.log('🔥 Enter key pressed, selectedMentionIndex:', selectedMentionIndex.value)
    console.log('🔥 filteredMentionUsers:', filteredMentionUsers.value)
    console.log('🔥 Selected user:', filteredMentionUsers.value[selectedMentionIndex.value])
    
    if (filteredMentionUsers.value[selectedMentionIndex.value]) {
      insertMention(filteredMentionUsers.value[selectedMentionIndex.value])
    } else {
      console.log('❌ No user selected or invalid index')
    }
    return false
  }

  if (e.key === 'Escape') {
    e.preventDefault()
    closeMentionList()
    return false
  }

  return true
}

// 滾動到選中的項目
const scrollToSelectedItem = () => {
  // 使用 nextTick 確保 DOM 已更新
  nextTick(() => {
    const mentionCard = document.querySelector('.mention-card')
    const selectedItem = document.querySelector('.mention-item-selected')
    
    if (mentionCard && selectedItem) {
      const cardRect = mentionCard.getBoundingClientRect()
      const itemRect = selectedItem.getBoundingClientRect()
      
      // 檢查項目是否在可見區域外
      if (itemRect.top < cardRect.top) {
        // 項目在上方，向上滾動
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      } else if (itemRect.bottom > cardRect.bottom) {
        // 項目在下方，向下滾動
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  })
}

const insertMention = (user: any) => {
  console.log('🚀 STARTING insertMention for user:', user)
  
  const editor = quillRef.value?.getQuill()
  if (!editor) {
    console.log('❌ No editor instance')
    return
  }
  
  if (!mentionRange.value) {
    console.log('❌ No mentionRange')
    return
  }

  console.log('📍 Current mentionRange:', mentionRange.value)
  console.log('🔍 Current mentionQuery:', mentionQuery.value)
  
  // 記錄當前編輯器狀態
  const currentSelection = editor.getSelection()
  console.log('📍 Current selection before operation:', currentSelection)
  console.log('� Current editor text before operation:', JSON.stringify(editor.getText()))
  
  try {
    // 計算要刪除的範圍
    const deleteStart = mentionRange.value.index
    const deleteLength = mentionQuery.value.length + 1 // +1 for @
    
    console.log(`🗑️ About to delete text from ${deleteStart} to ${deleteStart + deleteLength}`)
    console.log(`🗑️ Text to be deleted: "${editor.getText(deleteStart, deleteLength)}"`)
    
    // 執行刪除
    editor.deleteText(deleteStart, deleteLength)
    console.log('📖 Text after deletion:', JSON.stringify(editor.getText()))
    
    // 插入 mention 文字
    const mentionText = `@${user.name}`
    console.log(`✍️ About to insert "${mentionText}" at position ${deleteStart}`)
    
    // 執行插入
    editor.insertText(deleteStart, mentionText)
    console.log('📖 Text after mention insertion:', JSON.stringify(editor.getText()))
    
    // 插入空格
    const spacePosition = deleteStart + mentionText.length
    console.log(`🔤 About to insert space at position ${spacePosition}`)
    editor.insertText(spacePosition, ' ')
    console.log('📖 Text after space insertion:', JSON.stringify(editor.getText()))
    
    // 設置游標位置
    const newCursorPosition = spacePosition + 1
    console.log(`📍 Setting cursor to position ${newCursorPosition}`)
    editor.setSelection(newCursorPosition, 0)
    
    const finalSelection = editor.getSelection()
    console.log('📍 Final selection:', finalSelection)
    console.log('📖 Final editor text:', JSON.stringify(editor.getText()))
    
    console.log('✅ insertMention completed successfully')
    
  } catch (error) {
    console.error('💥 Error during insertMention:', error)
  } finally {
    // 關閉 mention 列表
    closeMentionList()
    emit('mention', user)
  }
}

const closeMentionList = () => {
  showMentionList.value = false
  mentionQuery.value = ''
  selectedMentionIndex.value = 0
  mentionRange.value = null
}

const handleTextChange = () => {
  const editor = quillRef.value?.getQuill()
  if (!editor || !props.enableMention) return

  const selection = editor.getSelection()
  if (!selection) return

  const text = editor.getText(0, selection.index)
  const atIndex = text.lastIndexOf('@')
  
  console.log('🔍 Text change detected:', { 
    text: text, 
    selectionIndex: selection.index, 
    atIndex: atIndex 
  })
  
  if (atIndex !== -1) {
    const queryText = text.slice(atIndex + 1)
    console.log('🎯 Found @ symbol, query text:', queryText)
    
    // 檢查 @ 後面是否只有字母、數字，不包含空格（空格會結束 mention）
    if (/^[a-zA-Z0-9\u4e00-\u9fa5]*$/.test(queryText) && queryText.length <= 20) {
      mentionQuery.value = queryText
      mentionRange.value = { index: atIndex, length: queryText.length }
      
      console.log('✅ Setting mention state:', {
        query: mentionQuery.value,
        range: mentionRange.value
      })
      
      // 計算 mention 列表位置
      const bounds = editor.getBounds(selection.index)
      const editorRect = editor.container.getBoundingClientRect()
      
      mentionPosition.value = {
        top: bounds.top + bounds.height + editorRect.top + 5,
        left: bounds.left + editorRect.left,
      }
      
      showMentionList.value = true
      selectedMentionIndex.value = 0
    } else {
      console.log('❌ Invalid query text, closing mention list')
      closeMentionList()
    }
  } else {
    console.log('❌ No @ symbol found, closing mention list')
    closeMentionList()
  }
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
      'mention',
    ],
    ...props.config,
  }
})// 監聽外部值變化
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
  // 註冊 mention 格式
  const Inline = editor.constructor.import('blots/inline')
  
  class MentionBlot extends Inline {
    static blotName = 'mention'
    static tagName = 'span'
    static className = 'ql-mention'
    
    static create(value: any) {
      const node = super.create()
      node.setAttribute('data-mention-id', value.id)
      node.setAttribute('data-mention-name', value.name)
      if (value.email) {
        node.setAttribute('data-mention-email', value.email)
      }
      node.textContent = `@${value.name}`
      node.className = 'ql-mention'
      return node
    }
    
    static value(node: any) {
      return {
        id: node.getAttribute('data-mention-id'),
        name: node.getAttribute('data-mention-name'),
        email: node.getAttribute('data-mention-email'),
      }
    }
    
    static formats(node: any) {
      return {
        id: node.getAttribute('data-mention-id'),
        name: node.getAttribute('data-mention-name'),
        email: node.getAttribute('data-mention-email'),
      }
    }
  }
  
  // 確保 MentionBlot 被正確註冊
  if (!editor.constructor.imports['formats/mention']) {
    editor.constructor.register(MentionBlot)
  }

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

  // 監聽文字變化以處理 mention
  editor.on('text-change', () => {
    handleTextChange()
  })

  // 監聽選擇變化
  editor.on('selection-change', (range: any) => {
    if (!range) {
      closeMentionList()
    }
  })

  // 添加鍵盤事件監聽器到編輯器
  const editorContainer = editor.root
  editorContainer.addEventListener('keydown', (e: KeyboardEvent) => {
    if (showMentionList.value) {
      const handled = handleMentionKeydown(e)
      if (!handled) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  })

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
    
    <!-- Mention 列表 -->
    <Teleport to="body">
      <div
        v-if="showMentionList && filteredMentionUsers.length > 0"
        class="mention-list"
        :style="{
          position: 'fixed',
          top: `${mentionPosition.top}px`,
          left: `${mentionPosition.left}px`,
          zIndex: 9999,
        }"
      >
        <VCard
          elevation="8"
          class="mention-card"
        >
          <VList
            density="compact"
            class="mention-list-items"
          >
            <VListItem
              v-for="(user, index) in filteredMentionUsers"
              :key="user.id"
              :class="{
                'mention-item-selected': index === selectedMentionIndex,
              }"
              class="mention-item"
              @click="insertMention(user)"
              @mouseenter="selectedMentionIndex = index"
            >
              <template #prepend>
                <VAvatar
                  size="32"
                  :image="user.avatar"
                  :color="user.avatar ? undefined : 'primary'"
                >
                  <span v-if="!user.avatar">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                </VAvatar>
              </template>
              
              <VListItemTitle>{{ user.name }}</VListItemTitle>
              <VListItemSubtitle v-if="user.email">
                {{ user.email }}
              </VListItemSubtitle>
            </VListItem>
          </VList>
        </VCard>
      </div>
    </Teleport>
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

// Mention 列表樣式
.mention-list {
  max-width: 300px;
  min-width: 200px;
}

.mention-card {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mention-list-items {
  padding: 4px 0;
}

.mention-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover,
  &.mention-item-selected {
    background: rgba(var(--v-theme-primary), 0.1) !important;
  }
  
  :deep(.v-list-item__content) {
    padding: 8px 0;
  }
}

:deep(.ql-mention) {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  padding: 2px 4px;
  border-radius: 4px;
  text-decoration: none;
  
  &:hover {
    background: rgba(var(--v-theme-primary), 0.2);
  }
}
</style>

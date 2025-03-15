<script setup lang="ts">
import { reactive, ref } from 'vue'

// import axios from 'axios'

interface FileAttachment {
  name: string
  size: number
  type: string
  url: string
  file: File
  id: string
}

const attachments = ref<FileAttachment[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const uploadProgress = ref<Record<string, number>>({})
const showCheckmarks = reactive<Record<string, boolean>>({}) // 使用單獨的對象來跟踪勾勾顯示狀態

// 生成唯一ID
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// 獲取文件圖標
const getFileIcon = (fileType: string): string => {
  if (fileType.startsWith('image/'))
    return 'ri-image-line'
  else if (fileType.startsWith('video/'))
    return 'ri-video-line'
  else if (fileType.startsWith('audio/'))
    return 'ri-music-line'
  else if (fileType.includes('pdf'))
    return 'ri-file-pdf-line'
  else if (fileType.includes('word') || fileType.includes('document'))
    return 'ri-file-word-line'
  else if (fileType.includes('excel') || fileType.includes('sheet'))
    return 'ri-file-excel-line'
  else if (fileType.includes('powerpoint') || fileType.includes('presentation'))
    return 'ri-file-ppt-line'
  else if (fileType.includes('zip') || fileType.includes('compressed'))
    return 'ri-file-zip-line'
  else
    return 'ri-file-line'
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0)
    return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

// 模擬上傳進度
const simulateUpload = (file: FileAttachment) => {
  uploadProgress.value[file.id] = 0

  const interval = setInterval(() => {
    if (uploadProgress.value[file.id] < 100) {
      uploadProgress.value[file.id] += Math.floor(Math.random() * 10) + 1

      if (uploadProgress.value[file.id] > 100)
        uploadProgress.value[file.id] = 100
    }
    else {
      clearInterval(interval)

      // 上傳完成後，顯示勾勾
      showCheckmarks[file.id] = true

      // 1.5秒後隱藏勾勾
      setTimeout(() => {
        showCheckmarks[file.id] = false
      }, 1500)

      // 這裡可以添加實際的上傳完成處理
      // 例如：發送到服務器等

      /* 實際上傳代碼示例
      const formData = new FormData()
      formData.append('file', file.file)

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            uploadProgress.value[file.id] = percentCompleted
          }
        })

        // 處理上傳成功
        console.log('上傳成功', response.data)
      } catch (error) {
        console.error('上傳失敗', error)
      }
      */
    }
  }, 200)
}

// 觸發文件選擇對話框
const triggerFileInput = () => {
  if (fileInput.value)
    fileInput.value.click()
}

// 處理文件上傳
const handleFiles = (files: FileList | null) => {
  if (!files)
    return

  Array.from(files).forEach(file => {
    // 檢查文件是否已經存在
    const exists = attachments.value.some(attachment =>
      attachment.name === file.name && attachment.size === file.size,
    )

    if (!exists) {
      const newFile: FileAttachment = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        file,
        id: generateUniqueId(),
      }

      attachments.value.push(newFile)

      // 模擬上傳進度
      simulateUpload(newFile)
    }
  })
}

// 處理文件選擇事件
const uploadFile = (event: Event) => {
  const target = event.target as HTMLInputElement

  handleFiles(target.files)

  // 重置 input 以便可以再次選擇相同的文件
  if (target)
    target.value = ''
}

// 處理拖放事件
const onDragEnter = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  handleFiles(e.dataTransfer?.files || null)
}

// 下載文件
const downloadFile = (file: FileAttachment) => {
  // 創建一個臨時的 a 元素
  const a = document.createElement('a')

  a.href = file.url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 刪除文件
const deleteFile = (fileId: string) => {
  const index = attachments.value.findIndex(file => file.id === fileId)
  if (index === -1)
    return

  const file = attachments.value[index]

  // 釋放 URL 對象
  URL.revokeObjectURL(file.url)

  // 從數組中移除
  attachments.value.splice(index, 1)

  // 移除上傳進度和勾勾狀態
  delete uploadProgress.value[fileId]
  delete showCheckmarks[fileId]
}
</script>

<template>
  <div class="file-upload-container">
    <!-- 上傳按鈕和拖放區域 -->
    <div class="upload-area">
      <VBtn
        variant="tonal"
        color="primary"
        size="small"
        prepend-icon="ri-upload-line"
        @click="triggerFileInput"
      >
        選擇文件
      </VBtn>
      <div
        class="dropzone"
        :class="{ 'is-dragging': isDragging }"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
      >
        <span class="text-caption text-medium-emphasis">拖放文件至此</span>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      hidden
      multiple
      @change="uploadFile"
    >

    <!-- 文件列表 -->
    <div
      v-if="attachments.length > 0"
      class="file-list"
    >
      <div
        v-for="file in attachments"
        :key="file.id"
        class="file-item"
      >
        <!-- 文件信息 -->
        <div
          class="file-info"
          @click="downloadFile(file)"
        >
          <VIcon
            :icon="getFileIcon(file.type)"
            size="small"
            color="primary"
          />
          <div class="file-details">
            <div class="file-name">
              {{ file.name }}
            </div>
            <div class="file-size">
              {{ formatFileSize(file.size) }}
            </div>
          </div>
        </div>

        <!-- 文件操作 -->
        <div class="file-actions">
          <div class="progress-container">
            <VProgressCircular
              v-if="uploadProgress[file.id] < 100"
              :model-value="uploadProgress[file.id]"
              :size="16"
              :width="2"
              color="primary"
            />
            <Transition name="checkmark-fly">
              <VIcon
                v-if="showCheckmarks[file.id]"
                icon="ri-check-line"
                color="success"
                size="small"
                class="checkmark-icon"
              />
            </Transition>
          </div>
          <VBtn
            icon
            variant="text"
            color="error"
            size="small"
            @click="deleteFile(file.id)"
          >
            <VIcon
              size="small"
              icon="ri-close-line"
            />
          </VBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload-container {
  max-inline-size: 100%;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropzone {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(var(--v-theme-primary), 0.4);
  border-radius: 4px;
  background-color: rgba(var(--v-theme-primary), 0.03);
  block-size: 28px;
  cursor: pointer;
  padding-inline: 8px;
  transition: all 0.2s ease;
}

.dropzone:hover, .dropzone.is-dragging {
  border-color: rgba(var(--v-theme-primary), 0.7);
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.file-list {
  margin-block-start: 8px;
  max-block-size: none;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding-block: 4px;
  padding-inline: 8px;
  transition: background-color 0.2s;
}

.file-item:not(:last-child) {
  border-block-end: 1px solid rgba(var(--v-border-opacity), 0.1);
}

.file-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.file-info {
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  min-inline-size: 0;
}

.file-details {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
}

.file-name {
  overflow: hidden;
  font-size: 0.8125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.75rem;
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 24px;
  inline-size: 24px;
}

/* 勾勾飛出動畫 */
.checkmark-icon {
  position: absolute;
  margin: auto;
  inset-inline: 0;
}

.checkmark-fly-enter-active {
  animation: fly-in 0.3s ease-out;
}

.checkmark-fly-leave-active {
  animation: fly-out 0.8s ease-in;
}

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fly-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(80px);
  }
}
</style>

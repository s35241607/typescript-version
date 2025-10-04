<script lang="ts" setup>
import { ref } from 'vue'

// 👉 Emits
const emit = defineEmits<{
  'add-comment': [comment: string]
}>()

// 👉 評論內容
const commentText = ref('')
const isSubmitting = ref(false)

// 👉 處理提交評論
async function handleSubmit() {
  if (!commentText.value.trim()) return
  
  isSubmitting.value = true
  
  try {
    emit('add-comment', commentText.value)
    commentText.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <VCard data-activity="comment-box-card">
    <VCardText>
      <div class="d-flex align-start gap-3">
        <VAvatar
          color="primary"
          size="40"
        >
          <span class="text-sm">U</span>
        </VAvatar>
        <div class="flex-grow-1">
          <VTextarea
            v-model="commentText"
            placeholder="Write a comment..."
            rows="4"
            variant="outlined"
            hide-details
            data-activity="comment-textarea"
          />
          <div class="d-flex justify-end mt-3 gap-2">
            <VBtn
              variant="text"
              size="small"
              @click="commentText = ''"
              :disabled="!commentText.trim() || isSubmitting"
              data-activity="comment-cancel-btn"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              size="small"
              @click="handleSubmit"
              :disabled="!commentText.trim() || isSubmitting"
              :loading="isSubmitting"
              data-activity="comment-submit-btn"
            >
              Comment
            </VBtn>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

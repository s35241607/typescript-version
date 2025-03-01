<script setup>
import { ref } from 'vue'

const emit = defineEmits(['confirmDelete'])

const confirmDelete = ref(false)

const deleteItem = () => {
  emit('confirmDelete')
  console.log('Deleted Succeefully') // 這裡可以呼叫 API 來刪除
  confirmDelete.value = false
}
</script>

<template>
  <VDialog
    v-model="confirmDelete"
    max-width="450"
  >
    <template #activator="{ props }">
      <!-- 觸發按鈕 -->
      <VBtn
        color="error"
        v-bind="props"
      >
        Delete
      </VBtn>
    </template>

    <!-- 確認刪除對話框 -->
    <VCard>
      <VCardTitle class="headline">
        Confirm Deletion
      </VCardTitle>

      <VCardText>
        <VAlert
          type="warning"
          variant="tonal"
        >
          Are you sure you want to delete this item? This action cannot be undone.
        </VAlert>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn
          variant="tonal"
          @click="confirmDelete = false"
        >
          Cancel
        </VBtn>
        <VBtn
          color="error"
          variant="elevated"
          @click="deleteItem"
        >
          Confirm Delete
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import TestToast from '@/views/Test/TestToast.vue'
import TestDeleteConfirm from '@/views/Test/TestDeleteConfirm.vue'
import TestDateInput from '@/views/Test/TestDateInput.vue'
</script>

<template>
  <TestToast />

  <VCard class="mt-4">
    <VCardItem>
      <VCardTitle>
        Test Delete Confirm
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <TestDeleteConfirm @confirm-delete="() => console.log('123')" />
    </VCardText>
  </VCard>

  <!-- 👉 test date-input -->
  <VCard class="mt-4">
    <VCardItem>
      <VCardTitle>
        Test DateInput
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <TestDateInput />
    </VCardText>
  </VCard>
</template>

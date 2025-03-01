<script setup lang="ts">
import TestToast from '@/views/Test/TestToast.vue'
import TestDeleteConfirm from '@/views/Test/TestDeleteConfirm.vue'
</script>

<template>
  <TestToast />

  <VCard>
    <VCardItem>
      <VCardTitle>
        Test Delete Confirm
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <TestDeleteConfirm @confirm-delete="() => console.log('123')" />
    </VCardText>
  </VCard>
</template>

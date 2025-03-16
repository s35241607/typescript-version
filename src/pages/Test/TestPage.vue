<script setup lang="ts">
import TestToast from '@/views/Test/TestToast.vue'
import TestDeleteConfirm from '@/views/Test/TestDeleteConfirm.vue'

// import TestDateInput from '@/views/Test/TestDateInput.vue'
import TestFileUplaod from '@/views/Test/TestFileUplaod.vue'
import TableDemo from '@/views/Test/TableDemo.vue'
</script>

<template>
  <!-- 👉 test toast -->
  <TestToast />

  <!-- 👉 test delete confirm -->
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
      <!-- <TestDateInput /> -->
    </VCardText>
  </VCard>

  <!-- 👉 test file upload -->
  <VCard class="mt-4">
    <VCardItem>
      <VCardTitle>
        Test File Upload
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <TestFileUplaod />
    </VCardText>
  </VCard>

  <!-- 👉 test data table -->
  <VCard class="mt-4">
    <VCardItem>
      <VCardTitle>
        Test Data Table
      </VCardTitle>
    </VCardItem>
    <VCardText>
      <TableDemo />
    </VCardText>
  </VCard>
</template>

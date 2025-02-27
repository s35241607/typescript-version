<script setup lang="ts">
import { useToastStore } from '@/stores/useToastStore'

const toast = useToastStore()

const onClick = (msg: string, type: string) => {
  toast.show(msg, type)
}
</script>

<template>
  <VCard class="mx-auto my-4">
    <VCardItem>
      <VCardTitle class="text-h4 font-weight-bold">
        Test Page
      </VCardTitle>
    </VCardItem>
    <VDivider />
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VAlert
            color="info"
            variant="tonal"
            border="start"
          >
            Toast Test
          </VAlert>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn
            color="success"
            variant="elevated"
            @click="onClick('success', 'success')"
          >
            Success
          </VBtn>
          <VBtn
            color="error"
            variant="elevated"
            @click="onClick('error', 'error')"
          >
            Error
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

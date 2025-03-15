<script setup lang="ts">
import { useDate } from 'vuetify'
import { VDateInput } from 'vuetify/labs/components'

const date = useDate()
const modelDate = ref(date.date())
</script>

<template>
  <VDateInput
    v-model="modelDate"
    placeholder="yyyy-mm-dd"
    hide-actions
  />
</template>

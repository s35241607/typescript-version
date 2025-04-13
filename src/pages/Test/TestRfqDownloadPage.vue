<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

interface Machine {
  id: string
  name: string
  hasPriceTable: boolean
}

const selectedMachine = ref<string | null>(null)
const snackbarStore = useSnackbarStore()

// 範例機器資料
const machines = ref<Machine[]>([
  { id: 'machine-a', name: 'Machine A', hasPriceTable: true },
  { id: 'machine-b', name: 'Machine B', hasPriceTable: false },
  { id: 'machine-c', name: 'Machine C', hasPriceTable: true },
])

const selectedMachineDetails = computed(() => {
  return machines.value.find(m => m.id === selectedMachine.value) || null
})

const downloadTemplate = (withPriceTable: boolean) => {
  if (!selectedMachine.value)
    return

  const machineName = selectedMachineDetails.value?.name || 'Unknown Machine'
  const type = withPriceTable ? 'with Price Table' : 'without Price Table'

  snackbarStore.showSnackbar({
    message: `Downloading RFQ template for ${machineName} ${type}...`,
    color: 'success',
  })
}
</script>

<template>
  <VContainer>
    <VRow justify="center">
      <VCol
        cols="12"
        md="10"
        lg="8"
      >
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">
            RFQ Template Download
          </h1>
          <p class="text-body-1 text-grey-darken-1">
            Select a machine and download the appropriate RFQ template
          </p>
        </div>

        <!-- Step 1: Select Machine -->
        <VCard
          class="mb-6"
          elevation="2"
        >
          <VCardTitle class="text-h6 font-weight-medium">
            Step 1: Select Machine
          </VCardTitle>
          <VCardSubtitle>Choose the machine for which you need an RFQ template</VCardSubtitle>
          <VCardText>
            <VSelect
              v-model="selectedMachine"
              :items="machines"
              item-title="name"
              item-value="id"
              label="Select Machine"
              variant="outlined"
              clearable
            >
              <template #item="{ props, item }">
                <VListItem
                  v-bind="props"
                  :title="item.raw.name"
                >
                  <template #append>
                    <VChip
                      v-if="item.raw.hasPriceTable"
                      color="success"
                      size="small"
                      variant="flat"
                      label
                    >
                      Price Table
                    </VChip>
                  </template>
                </VListItem>
              </template>
              <template #selection="{ item }">
                <span>{{ item.raw.name }}</span>
                <VChip
                  v-if="item.raw.hasPriceTable"
                  color="success"
                  size="small"
                  variant="flat"
                  label
                  class="ml-2"
                >
                  Price Table
                </VChip>
              </template>
            </VSelect>
          </VCardText>
        </VCard>

        <!-- Step 2: Download Template -->
        <Transition name="slide-fade">
          <VCard
            v-if="selectedMachine"
            elevation="2"
            class="mt-6"
            color="surface"
          >
            <VCardTitle class="text-h6 font-weight-medium">
              Step 2: Download Template
            </VCardTitle>
            <VCardSubtitle>Select the appropriate template option for {{ selectedMachineDetails?.name }}</VCardSubtitle>
            <VCardText>
              <!-- Price Table Status -->
              <VAlert
                v-if="selectedMachineDetails?.hasPriceTable"
                type="success"
                variant="tonal"
                icon="ri-checkbox-circle-line"
                class="mb-6"
                border="start"
                density="compact"
                border-color="success"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <div class="font-weight-medium">
                      Price Table Status
                    </div>
                    <div>Price Table is available for this machine.</div>
                  </div>
                  <VBtn
                    variant="text"
                    color="success"
                    append-icon="ri-external-link-line"
                    size="small"
                    href="#"
                    target="_blank"
                  >
                    View Price Table
                  </VBtn>
                </div>
              </VAlert>
              <VAlert
                v-else
                type="info"
                variant="tonal"
                icon="ri-information-line"
                class="mb-6"
                border="start"
                density="compact"
                border-color="info"
              >
                Price Table is not available for this machine.
              </VAlert>

              <!-- Download Options -->
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VCard
                    elevation="1"
                    class="text-center fill-height d-flex flex-column"
                    hover
                  >
                    <VCardText class="flex-grow-1">
                      <VIcon
                        size="48"
                        color="primary"
                        class="mb-4"
                      >
                        ri-download-2-line
                      </VIcon>
                      <h3 class="text-h6 mb-2">
                        RFQ Template with Price Table
                      </h3>
                      <p class="text-body-2 text-grey-darken-1 mb-4">
                        Download the RFQ template that includes the Price Table data
                      </p>
                    </VCardText>
                    <VCardActions class="justify-center pa-4">
                      <VBtn
                        color="primary"
                        variant="flat"
                        :disabled="!selectedMachineDetails?.hasPriceTable"
                        @click="downloadTemplate(true)"
                      >
                        Download
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VCard
                    elevation="1"
                    class="text-center fill-height d-flex flex-column"
                    hover
                  >
                    <VCardText class="flex-grow-1">
                      <VIcon
                        size="48"
                        color="primary"
                        class="mb-4"
                      >
                        ri-download-2-line
                      </VIcon>
                      <h3 class="text-h6 mb-2">
                        RFQ Template without Price Table
                      </h3>
                      <p class="text-body-2 text-grey-darken-1 mb-4">
                        Download the basic RFQ template without Price Table data
                      </p>
                    </VCardText>
                    <VCardActions class="justify-center pa-4">
                      <VBtn
                        color="primary"
                        variant="flat"
                        @click="downloadTemplate(false)"
                      >
                        Download
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VCol>
              </VRow>

              <!-- Format Note -->
              <div class="text-center mt-6 text-caption text-medium-emphasis">
                <VIcon
                  size="small"
                  start
                >
                  ri-information-line
                </VIcon>
                Templates are available in Excel format (.xlsx)
              </div>
            </VCardText>
          </VCard>
        </Transition>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
/* Slide-fade animation */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Download card hover effect */
.download-card:hover {
  border: 1px solid rgba(var(--v-theme-primary), 0.7);
  box-shadow: 0 4px 14px rgba(var(--v-theme-primary), 0.15);
}
</style>

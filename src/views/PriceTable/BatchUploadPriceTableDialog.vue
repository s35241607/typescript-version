<script setup lang="ts">
import { ref } from 'vue';
import FileUploader from '@/components/FileUploader.vue';
import * as XLSX from 'xlsx';
import type { VDataTable } from 'vuetify/components'; // For headers type if needed
import axios from 'axios';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

// Define interfaces for clarity
interface PriceTableUploadItem {
  'Order Number'?: string;
  'Machine ID'?: string;
  'Currency'?: string;
  'Contract Start Date'?: any; // Dates may need special handling/parsing
  'Contract End Date'?: any;
  'Status'?: string;
  'Remark'?: string;
  'Item Type'?: string;
  'Item EQP Option ID'?: number;
  'Item Saving Base'?: number;
  'Item List Price'?: number;
  'Item Reference Price'?: number;
  _id?: number; // For VDataTable key
}

const emit = defineEmits(['upload-completed']);
const snackbarStore = useSnackbarStore();
const isLoading = ref(false);

const dialogVisible = ref(false);
const previewItems = ref<PriceTableUploadItem[]>([]);
const previewHeaders = ref<InstanceType<typeof VDataTable>['headers']>([
  { title: 'Order Number', key: 'Order Number' },
  { title: 'Machine ID', key: 'Machine ID' },
  { title: 'Currency', key: 'Currency' },
  { title: 'Contract Start Date', key: 'Contract Start Date' },
  { title: 'Contract End Date', key: 'Contract End Date' },
  { title: 'Status', key: 'Status' },
  { title: 'Remark', key: 'Remark' },
  { title: 'Item Type', key: 'Item Type' },
  { title: 'Item EQP Option ID', key: 'Item EQP Option ID' },
  { title: 'Item Saving Base', key: 'Item Saving Base' },
  { title: 'Item List Price', key: 'Item List Price' },
  { title: 'Item Reference Price', key: 'Item Reference Price' },
]);
const parsingError = ref<string | null>(null);

const clearPreviewData = () => {
  previewItems.value = [];
  parsingError.value = null;
  // Note: FileUploader's initialAttachments should be managed by its `key` or `v-if` if full reset is needed,
  // or by explicitly clearing its internal attachments if it provides a method.
  // For now, clearing our local preview is the main goal.
};

const openDialog = () => {
  clearPreviewData();
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  clearPreviewData();
};

const handleFileSelectedForPreview = (file: File) => {
  const reader = new FileReader();
  parsingError.value = null;
  previewItems.value = [];

  reader.onload = (e: ProgressEvent<FileReader>) => {
    try {
      const data = e.target?.result;
      if (!data) {
        parsingError.value = "Failed to read file.";
        return;
      }
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json<PriceTableUploadItem>(worksheet, {
        // Ensure headers match exactly or provide a mapping
        // defval: '' // can be used to ensure all keys are present if needed
      });

      previewItems.value = jsonData.map((item, index) => ({ ...item, _id: index }));

      if (previewItems.value.length === 0) {
        parsingError.value = "No data found in file or file is not in the expected format. Ensure the first sheet has data and headers match the template.";
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      parsingError.value = "Error parsing file. Make sure it's a valid Excel file and matches the template format.";
      previewItems.value = [];
    }
  };

  reader.onerror = () => {
    parsingError.value = "Failed to read file.";
  };

  reader.readAsArrayBuffer(file);
};

const handleAttachmentsUpdate = (newAttachments: any[]) => {
  if (newAttachments && newAttachments.length > 0) {
    const lastFileAttachment = newAttachments[newAttachments.length - 1];
    if (lastFileAttachment && lastFileAttachment.file) {
      handleFileSelectedForPreview(lastFileAttachment.file);
    } else {
      parsingError.value = "File not available for preview.";
      previewItems.value = [];
    }
  } else {
    // If attachments are cleared (e.g., user removes the file from FileUploader)
    clearPreviewData();
  }
};

const confirmUpload = async () => {
  if (!previewItems.value || previewItems.value.length === 0) {
    snackbarStore.showSnackbar({ message: 'No items to upload. Please upload and preview data first.', color: 'warning' });
    return;
  }

  isLoading.value = true;
  parsingError.value = null; // Clear previous parsing errors

  // Prepare payload: remove temporary _id and ensure data format
  const payload = previewItems.value.map(item => {
    const { _id, ...restOfItem } = item; // Remove _id
    // Potentially transform date fields here if they are Date objects
    // For example, if 'Contract Start Date' is a Date object:
    // if (restOfItem['Contract Start Date'] instanceof Date) {
    //   restOfItem['Contract Start Date'] = restOfItem['Contract Start Date'].toISOString().split('T')[0];
    // }
    // if (restOfItem['Contract End Date'] instanceof Date) {
    //   restOfItem['Contract End Date'] = restOfItem['Contract End Date'].toISOString().split('T')[0];
    // }
    return restOfItem;
  });

  try {
    const response = await axios.post('/api/price-tables/batch-upload', payload);
    // Assuming backend returns a body with a message property
    snackbarStore.showSnackbar({
      message: response.data.message || 'Batch upload successful!',
      color: 'success',
    });
    emit('upload-completed');
    closeDialog();
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred during batch upload.';
    if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    snackbarStore.showSnackbar({
      message: errorMessage,
      color: 'error',
    });
    console.error('Batch upload error:', error);
  } finally {
    isLoading.value = false;
  }
};

defineExpose({
  openDialog,
});
</script>

<template>
  <VDialog v-model="dialogVisible" max-width="800px" persistent>
    <VCard>
      <VCardTitle>
        Batch Upload Price Table
        <VSpacer />
        <VBtn icon @click="closeDialog">
          <VIcon>ri-close-line</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VBtn
              href="/price_table_template.xlsx"
              download="price_table_template.xlsx"
              color="primary"
              class="mb-4"
            >
              Download Template
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <FileUploader
              @update:attachments="handleAttachmentsUpdate"
              uploadUrl="/api/dummy-upload-for-now"
              relatedId="batchPriceTable"
              relatedType="price-table-batch"
              :initialAttachments="[]"
              :multiple="false"
              accept=".xlsx, .xls"
            />
          </VCol>
        </VRow>
        <VRow v-if="parsingError" class="mt-4">
          <VCol cols="12">
            <VAlert type="error" dense>{{ parsingError }}</VAlert>
          </VCol>
        </VRow>
        <VRow v-if="previewItems.length > 0" class="mt-4">
          <VCol cols="12">
            <VDataTable
              :headers="previewHeaders"
              :items="previewItems"
              item-value="_id"
              density="compact"
              class="elevation-1"
              :items-per-page="5"
            >
              <!-- Slot for 'Item List Price' (editable) -->
              <template #[`item.Item List Price`]="{ item }">
                <VTextField
                  v-model.number="item.raw['Item List Price']"
                  type="number"
                  density="compact"
                  hide-details
                />
              </template>

              <!-- Slot for 'Item Saving Base' (editable) -->
              <template #[`item.Item Saving Base`]="{ item }">
                <VTextField
                  v-model.number="item.raw['Item Saving Base']"
                  type="number"
                  density="compact"
                  hide-details
                />
              </template>

              <!-- Slot for 'Remark' (editable) -->
              <template #[`item.Remark`]="{ item }">
                <VTextField
                  v-model="item.raw['Remark']"
                  density="compact"
                  hide-details
                />
              </template>

              <template #no-data>
                <div class="text-center pa-4">No data to preview.</div>
              </template>
            </VDataTable>
          </VCol>
        </VRow>
        <VRow v-else-if="!parsingError && previewItems.length === 0" class="mt-4">
           <VCol cols="12">
            <div class="preview-area pa-4 border">
              <p class="text-center">Upload a file to see the preview. Ensure the file matches the template format.</p>
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="secondary" @click="closeDialog" :disabled="isLoading">
          Cancel
        </VBtn>
        <VBtn color="primary" @click="confirmUpload" :loading="isLoading" :disabled="isLoading">
          Confirm
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
.preview-area {
  border: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.border { /* This class is applied by Vuetify's VSheet by default if 'border' prop is true, or can be used manually */
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>

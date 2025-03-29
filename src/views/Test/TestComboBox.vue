<script setup>
import { onMounted, ref, watch } from 'vue'
import { eqpOptionService } from '@/api/services/mockService'
import { useApi } from '@/composables/useApi'

const editingItem = ref(null)

const model = ref([])
const search = ref(null)

const { data, loading, fetch } = useApi()

const addItem = async name => {
  try {
    const newItem = { name }

    // TODO: 這邊要去呼叫 api 並把結果串回去

    newItem.id = 999
    data.value.push(newItem)
  }
  catch (error) {
    console.error('Error adding item:', error)
  }
}

watch(model, async (val, prev) => {
  if (val.length === prev.length)
    return

  for (let i = 0; i < val.length; i++) {
    if (typeof val[i] === 'string')
      await addItem(val[i])
  }
})

onMounted(async () => {
  // 載入初始資料
  await fetch(eqpOptionService.generateMockEqpCategories())
})

const edit = item => {
  editingItem.value = editingItem.value ? null : item
  console.log('edit', item)

  // TODO: 這邊也要改成呼叫 API 去修改後端資料
}

const removeSelection = index => {
  model.value.splice(index, 1)
}

// 使用 computed 來判斷是否有完全匹配的資料
const exactMatch = computed(() => {
  return data.value.some(item => item.name === search.value)
})
</script>

<template>
  <VContainer fluid>
    <VCombobox
      v-model="model"
      v-model:search="search"
      :items="data"
      item-value="id"
      item-title="name"
      :loading="loading"
      label="Category"
      :hide-no-data="false"
    >
      <!-- 新增一個提示 -->
      <template #prepend-item>
        <VListItem disabled>
          <VListItemTitle>Choose or create an option</VListItemTitle>
        </VListItem>
      </template>

      <template #append-item>
        <VListItem
          v-if="!exactMatch && search"
          @click="addItem(search)"
        >
          <VListItemContent>
            <VListItemTitle>
              Create
              <VChip
                color="success"
                size="small"
                class="ml-2"
              >
                {{ search }}
              </VChip>
            </VListItemTitle>
          </VListItemContent>
        </VListItem>
      </template>

      <!-- 當搜尋結果為空時啥都不顯示 -->
      <template #no-data />

      <!-- 替換掉選中的樣式 -->
      <template #selection="{ item, index }">
        <VChip
          v-if="item === Object(item)"
          :text="item.title"
          size="small"
          closable
          @click:close="removeSelection(index)"
        />
      </template>

      <!-- 顯示每條資訊 -->
      <template #item="{ props, item }">
        <!--
          顯示有三種情境
          1. 新增模式 ( 要查無 id && 要有打值)
          2. 正常條列
          3. 編輯模式
        -->
        <!--
          <VListItem v-if="item.raw.id && search">
          <span class="mr-3">Create</span>
          <VChip
          size="small"
          variant="flat"
          label
          >
          {{ search }}
          </VChip>
          </VListItem>
        -->
        <!--
          <VListSubheader
          v-else-if="item.raw.header"
          :title="item.name"
          />
        -->
        <VListItem @click="props.onClick">
          <VTextField
            v-if="editingItem === item.raw"
            v-model="editingItem.title"
            bg-color="transparent"
            class="mr-3"
            density="compact"
            variant="plain"
            autofocus
            hide-details
            @click.stop
            @keydown.stop
            @keyup.enter="edit(item.raw)"
          />
          <span v-else> {{ item.raw.name }}</span>
          <template #append>
            <VBtn
              :color="editingItem !== item.raw ? 'primary' : 'success'"
              :icon="editingItem !== item.raw ? 'ri-pencil-line' : 'ri-check-fill'"
              size="small"
              variant="text"
              @click.stop.prevent="edit(item.raw)"
            />
          </template>
        </VListItem>
      </template>
    </VCombobox>
  </VContainer>
</template>

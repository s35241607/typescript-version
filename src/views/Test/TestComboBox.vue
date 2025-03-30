<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { eqpOptionService } from '@/api/services/mockService'
import { useApi } from '@/composables/useApi'

const editingItem = ref(null)

const model = ref<number | null>(null)
const search = ref<string | null>(null)
const createOptionRef = ref<HTMLElement | null>(null)

const { data, loading, fetch } = useApi()

const addItem = async (name: any) => {
  try {
    const newItem = {
      id: 999,
      name,
    }

    // TODO: 這邊要去呼叫 api 並把結果串回去

    data.value?.push(newItem)

    console.log('已新增', newItem)
  }
  catch (error) {
    console.error('Error adding item:', error)
  }
}

// 使用 computed 來判斷是否有完全匹配的資料
const exactMatch = computed(() => {
  return data.value?.some((item: any) => item.name === search.value)
})

const handleModelValue = (any: any) => {
  console.log('handleModelValue', any)

  // 感覺可以在這邊檢查如果不是 Object 格式的話就清掉 search
  // if (typeof (any) !== 'object')
  //   model.value = null
}

const handleFocued = (any: any) => {
  // console.log('handleFocued', any)
}

const handleBlur = (any: any) => {
  console.log('handleBlur', any)
}

watch(model, async (val, prev) => {
  console.log('model changes', val, prev)

  // if (val.length === prev.length)
  //   return

  // for (let i = 0; i < val.length; i++) {
  //   if (typeof val[i] === 'string')

  // fix 不應該在這邊新增
  // await addItem(val[i])

  // }
})

// 監聽 search 或 data 變化，當沒有選到且有搜尋字串時，自動 focus 新增選項
// watch([search, data], async () => {
//   if (!exactMatch.value && search.value) {
//     console.log('cccc')
//     await nextTick()
//     createOptionRef.value?.focus()
//   }
// })

onMounted(async () => {
  // 載入初始資料
  await fetch(eqpOptionService.generateMockEqpCategories())
})
</script>

<template>
  <VContainer fluid>
    <!--
      TODO: 1. blur 的時候不要自動選取
      TODO: 2. 選取資料的時候只要存 id，現在會抓整個 object
    -->
    model: {{ model }}
    <VCombobox
      v-model="model"
      v-model:search="search"
      :items="data"
      item-value="id"
      item-title="name"
      :loading="loading"
      label="Category"
      :hide-no-data="false"
      auto-select-first
      chips
      closable-chips
      :return-object="false"
      @update:focused="handleFocued"
      @update:model-value="handleModelValue"
      @blur="handleBlur"
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
          ref="createOptionRef"
          @click="addItem(search)"
        >
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
        </VListItem>
      </template>

      <!-- 當搜尋結果為空時啥都不顯示 -->
      <template #no-data />

      <!-- 替換掉選中的樣式 -->
      <!--
        <template #selection="{ item, index }">
        <VChip
        v-if="item === Object(item)"
        :text="item.title"
        size="small"
        closable
        @click:close="removeSelection(index)"
        />
        </template>
      -->

      <!-- 顯示每條資訊 -->
    </VCombobox>
  </VContainer>
</template>

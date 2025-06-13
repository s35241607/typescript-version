<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useTheme } from 'vuetify'

const show = ref(false)
const latestVersion = ref('')
const localVersion = import.meta.env.VITE_APP_VERSION || ''
const theme = useTheme()
const successColor = theme.current.value.colors.success

async function checkVersion() {
  try {
    // 取得最新版本資訊，不快取
    const res = await axios.get('/version.json', { headers: { 'Cache-Control': 'no-cache' } })
    const remoteVersion = res.data.version

    latestVersion.value = remoteVersion

    if (remoteVersion && remoteVersion !== localVersion)
      show.value = true
  }
  catch (e) {
    // 忽略錯誤
  }
}

function refreshPage() {
  window.location.reload()
}

onMounted(() => {
  checkVersion()
  setInterval(checkVersion, 5 * 60 * 1000) // 每 5 分鐘檢查一次
})
</script>

<template>
  <VSnackbar
    v-model="show"
    :color="successColor"
    timeout="0"
    location="top right"
    multi-line
  >
    發現新版本（{{ latestVersion }}），請重新整理以獲取最新內容。
    <template #actions>
      <VBtn
        color="primary"
        @click="refreshPage"
      >
        立即更新
      </VBtn>
      <VBtn
        color="grey-lighten-1"
        @click="show = false"
      >
        取消
      </VBtn>
    </template>
  </VSnackbar>
</template>

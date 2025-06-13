<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const show = ref(true)
const latestVersion = ref('')
const localVersion = import.meta.env.VITE_APP_VERSION || ''
async function checkVersion() {
  try {
    // 取得最新版本資訊，不快取，支援 Vite base 路徑
    const versionUrl = `${import.meta.env.BASE_URL}version.json`
    const res = await axios.get(versionUrl, { headers: { 'Cache-Control': 'no-cache' } })
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
  setInterval(checkVersion, 1 * 60 * 1000) // 每 1 分鐘檢查一次
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="version-update-toast"
    >
      <div class="toast-content">
        <div class="toast-header">
          <div class="toast-title-row">
            <i class="ri-refresh-line toast-inline-icon" />
            <span class="toast-title">有新版本可用</span>
            <span class="toast-version">v{{ latestVersion }}</span>
          </div>
          <span class="toast-tip">請重新整理頁面以獲取最新內容</span>
        </div>
      </div>
      <button
        class="toast-btn toast-update"
        @click="refreshPage"
      >
        <i class="ri-restart-line" /> 立即更新
      </button>
      <button
        class="toast-btn toast-close"
        aria-label="關閉"
        @click="show = false"
      >
        <i class="ri-close-line" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.version-update-toast {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  border: 1px solid rgba(var(--v-theme-primary), 0.15);
  border-radius: 10px;
  backdrop-filter: blur(6px);
  background: linear-gradient(145deg, var(--v-theme-surface), rgb(var(--v-theme-surface-variant), 0.3));
  border-inline-start: 3px solid var(--v-theme-primary);
  box-shadow: 0 4px 20px 0 rgba(var(--v-shadow-key-umbra-color), 0.1),
    0 2px 6px 0 rgba(var(--v-theme-primary), 0.15);
  color: var(--v-theme-on-surface);
  font-family: inherit;
  gap: 8px;
  inset-block-start: 16px;
  inset-inline-end: 16px;
  max-inline-size: 350px;
  min-inline-size: 280px;
  padding-block: 12px;
  padding-inline: 14px 10px;
}

.toast-inline-icon {
  color: var(--v-theme-primary);
  font-size: 1.1rem;
  margin-inline-end: 6px;
}

.toast-content {
  flex: 1 1 auto;
  min-inline-size: 0;
}

.toast-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toast-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toast-title {
  color: var(--v-theme-on-surface);
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
}

.toast-version {
  border-radius: 4px;
  background: linear-gradient(135deg, var(--v-theme-primary), var(--v-theme-primary-darken-1));

  /* box-shadow: 0 1px 1px 0 rgba(var(--v-theme-primary), 0.3); */
  color: var(--v-theme-on-primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding-block: 2px;
  padding-inline: 6px;
  white-space: nowrap;
}

.toast-tip {
  color: rgb(var(--v-theme-on-surface), 0.6);
  font-size: 0.8rem;
  line-height: 1.3;
}

.toast-btn {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--v-theme-on-surface);
  cursor: pointer;
  font-size: 0.85rem;
  gap: 3px;
  margin-inline-start: 3px;
  padding-block: 5px;
  padding-inline: 10px;
  transition: all 0.2s ease;
}

.toast-update {
  background: var(--v-theme-primary);

  /* box-shadow: 0 1px 4px 0 rgba(var(--v-theme-primary), 0.25); */
  color: var(--v-theme-on-primary);
  font-weight: 500;
  margin-inline-start: 4px;
  white-space: nowrap;
}

.toast-update:hover {
  background: var(--v-theme-primary-darken-1);
  box-shadow: 0 3px 12px 0 rgba(var(--v-theme-primary), 0.4);
  transform: translateY(-0.5px);
}

.toast-close {
  color: rgb(var(--v-theme-on-surface), 0.5);
  font-size: 1rem;
  margin-inline-start: 2px;
  padding-block: 3px;
  padding-inline: 5px;
  transition: all 0.2s ease;
}

.toast-close:hover {
  background: rgb(var(--v-theme-on-surface), 0.08);
  color: rgb(var(--v-theme-on-surface), 0.8);
  transform: scale(1.05);
}

@media (max-width: 420px) {
  .version-update-toast {
    inset-inline: 8px;
    max-inline-size: unset;
    min-inline-size: unset;
    padding-block: 10px;
    padding-inline: 12px 8px;
  }

  .toast-title-row {
    gap: 6px;
  }
}
</style>

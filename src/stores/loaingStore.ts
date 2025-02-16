import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  // 定義 loading 狀態
  const loading = ref(false);

  // 設定 loading 狀態
  const setLoading = (status: boolean) => {
    loading.value = status;
  };

  return {
    loading,
    setLoading,
  };
});

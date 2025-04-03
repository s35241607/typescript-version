import { ref, shallowRef } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

/**
 * useApi 配置選項
 * @template TResponse API 原始響應類型
 * @template TData 轉換後的數據類型
 * @template TError 錯誤類型
 */
interface UseApiOptions<TResponse, TData, TError> {

  /** 數據的初始值 */
  initialData?: TData

  /**
   * 轉換 API 響應的函數
   * @param response API 原始響應
   * @returns 轉換後的數據
   */
  transform?: (response: TResponse) => TData

  /** 是否在發生錯誤時自動顯示 Snackbar，默認為 true */
  showSnackbarOnError?: boolean

  /**
   * 自定義錯誤處理函數
   * @param error 捕獲到的錯誤
   */
  onError?: (error: TError) => void
}

/**
 * useApi 返回值
 * @template TData 數據類型
 * @template TError 錯誤類型
 * @template TParams API 函數參數類型 (元組)
 */
interface UseApiReturn<TData, TError, TParams extends unknown[]> {

  /** 響應數據 (轉換後)，可能為 undefined */
  data: Ref<TData | undefined>

  /** 捕獲到的錯誤，初始為 null */
  error: ShallowRef<TError | null>

  /** 是否正在載入 */
  loading: Ref<boolean>

  /**
   * 執行 API 請求的函數
   * @param args API 函數所需的參數
   * @returns Promise，成功時解析為轉換後的數據，失敗時解析為 undefined
   */
  execute: (...args: TParams) => Promise<TData | undefined>
}

/**
 * 用於處理 API 請求的可組合函數 (Composable)
 *
 * @template TResponse - API 函數返回的原始響應類型
 * @template TData - 最終儲存的數據類型 (轉換後, 默認為 TResponse)
 * @template TError - 錯誤對象的類型 (默認為 unknown)
 * @template TParams - API 函數接受的參數類型 (默認為空數組 [])
 * @param apiFn - 實際執行 API 請求的異步函數
 * @param options - 配置選項 (可選)
 * @returns 包含 data, error, loading, execute 的對象
 */
export function useApi<
  TResponse,
  TData = TResponse,
  TError = unknown,
  TParams extends unknown[] = [],
>(
  apiFn: (...args: TParams) => Promise<TResponse>,
  options: UseApiOptions<TResponse, TData, TError> = {},
): UseApiReturn<TData, TError, TParams> {
  const {
    initialData,
    transform = (res: TResponse): TData => res as unknown as TData,
    showSnackbarOnError = true,
    onError,
  } = options

  // Add explicit type annotation to the ref declaration
  const data: any = ref(initialData)
  const error = shallowRef<TError | null>(null)
  const loading = ref<boolean>(false)

  const snackbarStore = useSnackbarStore()

  async function execute(...args: TParams): Promise<TData | undefined> {
    loading.value = true
    error.value = null

    try {
      const response = await apiFn(...args)
      const transformedData = transform(response)

      data.value = transformedData // Assigning to data ref

      return transformedData
    }
    catch (err) {
      const typedError = err as TError

      error.value = typedError
      console.error('API Error in useApi:', typedError)

      if (onError)
        onError(typedError)

      if (showSnackbarOnError) {
        let message = '發生未知錯誤'
        if (typedError && typeof typedError === 'object') {
          const potentialMessage = (typedError as any)?.response?.data?.message || (typedError as any)?.message || (typedError as any)?.error?.message

          if (typeof potentialMessage === 'string' && potentialMessage)
            message = potentialMessage
          else if (typedError instanceof Error)
            message = typedError.message
        }
        else if (typeof typedError === 'string' && typedError) {
          message = typedError
        }
        snackbarStore.show(message)
      }

      return undefined
    }
    finally {
      loading.value = false
    }
  }

  // Return the explicitly typed refs
  return { data, error, loading, execute }
}

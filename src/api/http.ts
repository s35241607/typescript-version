// src/api/http.ts
import type { AxiosRequestConfig } from 'axios'
import apiInstance from './apiInstance'

const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.get(url, config)

      return response.data as T
    }
    catch (error: any) {
      console.error('GET 請求失敗:', error)
      throw error
    }
  },
  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.post(url, data, config)

      return response.data as T
    }
    catch (error: any) {
      console.error('POST 請求失敗:', error)
      throw error
    }
  },
  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.put(url, data, config)

      return response.data as T
    }
    catch (error: any) {
      console.error('PUT 請求失敗:', error)
      throw error
    }
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.delete(url, config)

      return response.data as T
    }
    catch (error: any) {
      console.error('DELETE 請求失敗:', error)
      throw error
    }
  },

  // 新增 postForm 方法，用於上傳檔案 (FormData)
  postForm: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await apiInstance.postForm(url, data, config) // 注意呼叫的是 apiInstance.postForm

      return response.data as T
    }
    catch (error: any) {
      console.error('POST FORM 請求失敗:', error)
      throw error
    }
  },

  // 新增 download 方法，用於下載檔案 (Blob)
  download: async (url: string, config?: AxiosRequestConfig): Promise<Blob> => {
    try {
      const response = await apiInstance.get(url, { ...config, responseType: 'blob' }) // 設定 responseType: 'blob'

      return response.data as Blob // 回傳 Blob 物件
    }
    catch (error: any) {
      console.error('檔案下載失敗:', error)
      throw error
    }
  },
}

export default http

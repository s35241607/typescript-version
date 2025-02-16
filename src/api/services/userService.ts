// src/api/services/userService.ts
import http from '../http'
import type { User } from '../types/user'

const userService = {
  getUserList: async (params?: any): Promise<User[]> => {
    return await http.get<User[]>('/users', { params })
  },
  getUser: async (userId: number): Promise<User> => {
    return await http.get<User>(`/users/${userId}`)
  },

  getUserImage: async (userId: number): Promise<Blob> => {
    return await http.get<Blob>(`/users/${userId}/image`)
  },

  getCurrentUser: async (): Promise<User> => {
    return await http.get<User>('/users/me')
  },
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    return await http.post<User, Omit<User, 'id'>>('/users', userData)
  },
  updateUser: async (userId: number, userData: Omit<User, 'id'>): Promise<User> => {
    return await http.put<User, Omit<User, 'id'>>(`/users/${userId}`, userData)
  },
  deleteUser: async (userId: number): Promise<User> => {
    return await http.delete<User>(`/users/${userId}`)
  },

  // 檔案上傳範例
  uploadUserAvatar: async (userId: number, avatarFile: File): Promise<any> => {
    const formData = new FormData()

    formData.append('avatar', avatarFile) // 'avatar' 是後端接收檔案的欄位名稱，請根據後端 API 調整

    return await http.postForm(`/users/${userId}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // 顯式設定 Content-Type，雖然 FormData 通常會自動設定
    })
  },

  // 檔案下載範例
  downloadUserReport: async (userId: number): Promise<Blob> => {
    return await http.download(`/users/${userId}/report`)
  },

  // ... 其他用戶相關的 API 請求方法
}

export default userService

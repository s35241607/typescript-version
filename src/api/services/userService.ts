import http from '@/api/http'

const userService = {
  // Auth
  register: async (data: RegisterRequest) => await http.post<LoginResponse, RegisterRequest>('/api/v1/auth/register', data),
  login: async (data: LoginRequest) => await http.post<LoginResponse, LoginRequest>('/api/v1/auth/login', data),
  changePassword: async (data: ChangePasswordRequest) => await http.post<ApiResponse, ChangePasswordRequest>('/api/v1/auth/change-password', data),
  forgotPassword: async (data: ForgotPasswordRequest) => await http.post<ApiResponse, ForgotPasswordRequest>('/api/v1/auth/forgot-password', data),
  resetPassword: async (data: ResetPasswordRequest) => await http.post<ApiResponse, ResetPasswordRequest>('/api/v1/auth/reset-password', data),
  googleAuth: async (returnUrl: string) => await http.get(`/api/v1/auth/google-auth?returnUrl=${returnUrl}`),
  googleCallback: async (returnUrl?: string) => await http.get(`/api/v1/auth/google-callback${returnUrl ? `?returnUrl=${returnUrl}` : ''}`),

  // Permission
  getPermissions: async () => await http.get<PermissionResponse[]>('/api/v1/permissions'),
  createPermission: async (data: CreatePermissionRequest) => await http.post<PermissionResponse, CreatePermissionRequest>('/api/v1/permissions', data),
  getPermissionById: async (id: number) => await http.get<PermissionResponse>(`/api/v1/permissions/${id}`),
  updatePermission: async (id: number, data: UpdatePermissionRequest) => await http.put<PermissionResponse, UpdatePermissionRequest>(`/api/v1/permissions/${id}`, data),
  deletePermission: async (id: number) => await http.delete<ApiResponse>(`/api/v1/permissions/${id}`),

  // Role
  getRoles: async () => await http.get<RoleResponse[]>('/api/v1/roles'),
  createRole: async (data: CreateRoleRequest) => await http.post<RoleResponse, CreateRoleRequest>('/api/v1/roles', data),
  getRoleById: async (id: number) => await http.get<RoleResponse>(`/api/v1/roles/${id}`),
  updateRole: async (id: number, data: UpdateRoleRequest) => await http.put<RoleResponse, UpdateRoleRequest>(`/api/v1/roles/${id}`, data),
  deleteRole: async (id: number) => await http.delete<ApiResponse>(`/api/v1/roles/${id}`),

  // User
  getUsers: async () => await http.get<UserResponse[]>('/api/v1/users'),
  getUserById: async (id: number) => await http.get<UserResponse>(`/api/v1/users/${id}`),
  getUserByUsername: async (username: string) => await http.get<UserResponse>(`/username/${username}`),
  getCurrentUser: async () => await http.get<UserResponse>('/api/v1/users/me'),

  // UserImage
  getUserImage: async (id: number) => await http.download(`/api/v1/users/${id}/image`),
  uploadUserImage: async (id: number, formData: FormData) => await http.postForm<ApiResponse, FormData>(`/api/v1/users/${id}/image`, formData),
}

export default userService

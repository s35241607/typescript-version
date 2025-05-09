interface ApiResponse {
  code?: string | null;
  message?: string | null;
  errors?: { [key: string]: any } | null;
}

interface ChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

interface CreatePermissionRequest {
  name: string;
  description?: string | null;
}

interface CreateRoleRequest {
  name: string;
  description?: string | null;
}

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface LoginRequest {
  login: string;
  password: string;
}

interface LoginResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
}

interface PermissionResponse {
  id: number;
  name?: string | null;
  description?: string | null;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface ResetPasswordRequest {
  userId: number;
  token: string;
  newPassword: string;
}

interface RoleResponse {
  id: number;
  name?: string | null;
  description?: string | null;
}

interface UpdatePermissionRequest {
  name: string;
  description?: string | null;
}

interface UpdateRoleRequest {
  name: string;
  description?: string | null;
}

interface UpdateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  loginFailedAttempts: number;
  loginLockoutEnd?: string | null;
  lastLoginDate?: string | null;
  roles: RoleResponse[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string | null;
  role: "admin" | "readonly";
  active: boolean;
  created_at?: string;
  last_login?: string | null;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    user: User;
  };
  error: string | null;
}

export interface UpdateProfileRequest {
  email?: string;
}

export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
}

import { paginatedResponse } from "./paginated";

export type UserListResponse = paginatedResponse<User>;

export interface UserResponse {
  success: boolean;
  data: User;
  error: string | null;
}

export interface CreateUserRequest {
  username: string;
  email?: string;
  password: string;
  role: "admin" | "readonly";
}

export interface UpdateUserRequest {
  email?: string;
  role?: "admin" | "readonly";
  active?: boolean;
}

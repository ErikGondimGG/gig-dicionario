import { useDelete, useFetch, usePost, usePut } from "@/hooks/useApi";
import { post, put } from "@/lib/apiClient";
import type { ApiError } from "@/types/api";
import type {
  CreateUserRequest,
  RegisterRequest,
  RegisterResponse,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserListResponse,
  UserResponse,
} from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUsers() {
  return useFetch<UserListResponse>("users", "/api/v1/auth/users");
}

export function useUsersPaginated(page = 1, limit = 20, q?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (q) params.set("q", q);
  const url = `/api/v1/auth/users?${params.toString()}`;
  return useFetch<UserListResponse>(`users-${page}-${limit}-${q || ""}`, url);
}

export function useUser(id: string) {
  return useFetch<UserResponse>(`user-${id}`, `/api/v1/auth/me`, {
    enabled: !!id,
  });
}

export function useCreateUser() {
  return usePost<CreateUserRequest, UserResponse>("/api/v1/auth/register");
}

export function useUpdateUser(id: string) {
  return usePut<UpdateUserRequest, UserResponse>(`/api/v1/users/${id}`);
}

export function useDeleteUser(id: string) {
  return useDelete<{ success: boolean }>(`/api/v1/users/${id}`);
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation<UserResponse, ApiError, UpdateProfileRequest>({
    mutationFn: (data: UpdateProfileRequest) =>
      put<UserResponse, UpdateProfileRequest>("/api/v1/auth/profile", data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdatePassword() {
  return useMutation<{ success: boolean }, ApiError, UpdatePasswordRequest>({
    mutationFn: (data: UpdatePasswordRequest) =>
      put<{ success: boolean }, UpdatePasswordRequest>(
        "/api/v1/auth/change-password",
        data
      ),
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, ApiError, RegisterRequest>({
    mutationFn: (data: RegisterRequest) =>
      post<RegisterResponse, RegisterRequest>("/api/v1/auth/register", data),
  });
}

export function useResetUserPassword(id: string) {
  return useMutation<
    { success: boolean; data: { password: string } },
    ApiError,
    void
  >({
    mutationFn: () =>
      post<{ success: boolean; data: { password: string } }, void>(
        `/api/v1/users/${id}/reset-password`
      ),
  });
}

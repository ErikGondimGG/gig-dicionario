import type { ApiError, QueueItem, RefreshTokenResponse } from "@/types/api";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: ApiError | null, token: string | null = null): void {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = [];
}

function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function setStorageItem(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

function removeStorageItem(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

function handleUnauthorized(): void {
  removeStorageItem("auth_token");
  removeStorageItem("refresh_token");
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

async function refreshAuthToken(): Promise<string | null> {
  const refresh = getStorageItem("refresh_token");
  if (!refresh) return null;

  try {
    const res = await axios.post<RefreshTokenResponse>(`${API_BASE}/auth/refresh`, {
      token: refresh,
    });
    const newToken = res.data?.token;
    if (newToken) {
      setStorageItem("auth_token", newToken);
      return newToken;
    }
    return null;
  } catch {
    return null;
  }
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStorageItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(toApiError(error));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string | null) => {
              if (token && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(axios(originalRequest));
            },
            reject: (err: ApiError) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAuthToken();
        
        if (!newToken) {
          processQueue(toApiError({ message: "Session expired" }), null);
          isRefreshing = false;
          handleUnauthorized();
          return Promise.reject(toApiError({ message: "Session expired" }));
        }
        
        processQueue(null, newToken);
        isRefreshing = false;

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axios(originalRequest);
      } catch (refreshError) {
        const apiErr = toApiError(refreshError);
        processQueue(apiErr, null);
        isRefreshing = false;
        handleUnauthorized();
        return Promise.reject(apiErr);
      }
    }

    return Promise.reject(toApiError(error));
  }
);

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status,
      details: error.response?.data as Record<string, unknown> | undefined,
    };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: "Unknown error" };
}

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<T> = await api.get<T>(url, config);
  return res.data;
}

export async function post<TResponse, TData = unknown>(
  url: string,
  data?: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.post<TResponse>(url, data, config);
  return res.data;
}

export async function put<TResponse, TData = unknown>(
  url: string,
  data?: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.put<TResponse>(url, data, config);
  return res.data;
}

export async function patch<TResponse, TData = unknown>(
  url: string,
  data?: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const res: AxiosResponse<TResponse> = await api.patch<TResponse>(url, data, config);
  return res.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<T> = await api.delete<T>(url, config);
  return res.data;
}

export default api;


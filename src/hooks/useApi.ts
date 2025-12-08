import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { get, post, put, patch, del } from "@/lib/apiClient";
import type { ApiError } from "@/types/api";

type QueryOptions<TData> = Omit<
  UseQueryOptions<TData, ApiError, TData, QueryKey>,
  "queryKey" | "queryFn"
>;

type MutationOptions<TOutput, TInput> = Omit<
  UseMutationOptions<TOutput, ApiError, TInput, unknown>,
  "mutationFn"
>;

export function useFetch<TData>(
  key: string,
  url: string,
  options?: QueryOptions<TData>
) {
  return useQuery<TData, ApiError, TData, QueryKey>({
    queryKey: [key, url],
    queryFn: () => get<TData>(url),
    retry: 1,
    ...options,
  });
}

export function usePost<TInput, TOutput>(
  path: string,
  options?: MutationOptions<TOutput, TInput>
) {
  const qc = useQueryClient();
  return useMutation<TOutput, ApiError, TInput>({
    mutationFn: (body: TInput) => post<TOutput, TInput>(path, body),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
    ...options,
  });
}

export function usePut<TInput, TOutput>(
  path: string,
  options?: MutationOptions<TOutput, TInput>
) {
  const qc = useQueryClient();
  return useMutation<TOutput, ApiError, TInput>({
    mutationFn: (body: TInput) => put<TOutput, TInput>(path, body),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
    ...options,
  });
}

export function usePatch<TInput, TOutput>(
  path: string,
  options?: MutationOptions<TOutput, TInput>
) {
  const qc = useQueryClient();
  return useMutation<TOutput, ApiError, TInput>({
    mutationFn: (body: TInput) => patch<TOutput, TInput>(path, body),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
    ...options,
  });
}

export function useDelete<TOutput>(
  path: string,
  options?: MutationOptions<TOutput, void>
) {
  const qc = useQueryClient();
  return useMutation<TOutput, ApiError, void>({
    mutationFn: () => del<TOutput>(path),
    onSuccess: () => {
      void qc.invalidateQueries();
    },
    ...options,
  });
}


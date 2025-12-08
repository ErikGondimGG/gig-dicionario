import { TableListResponse } from "@/types/tables";
import { useFetch } from "./useApi";

export function useTables(page = 1, limit = 20, q?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (q) params.set("search", q);
  const url = `/api/v1/tables?${params.toString()}`;
  return useFetch<TableListResponse>(`tables-${page}-${limit}-${q || ""}`, url);
}

export function useTable(name: string) {
  return useFetch<TableListResponse>(
    `table-${name}`,
    `/api/v1/tables/SANKHYA/${name}`
  );
}

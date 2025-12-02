import { useFetch } from "@/hooks/useApi";
import type { SummaryResponse } from "@/types/summary";

export function useSummary() {
  return useFetch<SummaryResponse>("summary", "/api/v1/summary");
}

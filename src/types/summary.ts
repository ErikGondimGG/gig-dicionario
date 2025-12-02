export interface SummaryData {
  foreign_keys_count: number;
  procedures_count: number;
  tables_count: number;
  triggers_count: number;
  views_count: number;
}

export interface SummaryResponse {
  success: boolean;
  data: SummaryData;
  error: string | null;
}

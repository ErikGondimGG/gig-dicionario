import { paginatedResponse } from "./paginated";

export type TableListResponse = paginatedResponse<Table>;

export type TableResponse = Table;

interface Table {
  schema: string;
  name: string;
  table_type: string;
  row_count: number;
  columns: Column[];
}

interface Column {
  data_type: string;
  default_value: string;
  is_foreign_key: boolean;
  is_identity: boolean;
  is_nullable: boolean;
  is_primary_key: boolean;
  max_length: number;
  name: string;
}

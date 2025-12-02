export interface ApiError {
  message?: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (err: ApiError) => void;
}


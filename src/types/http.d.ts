export interface IPaginate {
  page: number;
  pageSize: number;
}

export interface IRepositoryResult<T = unknown> {
  data: T | null;
  count: number | null;
  error: { name: string; message: string } | null;
}

export interface IResult<T = unknown> {
  data: T | null;
  error?: { name: string; message: string };
}

export interface IList<T = unknown> {
  data?: T;
  count?: number;
  lastPage?: number;
  nextPage?: number;
  error?: { name: string; message: string };
}

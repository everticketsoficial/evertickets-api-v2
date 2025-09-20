export interface IPaginate {
  page: number;
  pageSize: number;
}

export interface IError {
  name: string;
  message: string;
}

export interface IRepositoryResult<T = unknown> {
  data: T | null;
  count: number | null;
  error: IError | null;
}

export interface IResult<T = unknown> {
  data: T | null;
  error?: IError;
}

export interface IList<T = unknown> {
  data?: T;
  count?: number;
  lastPage?: number;
  nextPage?: number;
  error?: IError;
}

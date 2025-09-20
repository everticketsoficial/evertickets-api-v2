import { IError, IPaginate } from '../../types/http';

interface Props {
  data: any;
  count: number | null;
  error: IError | null;
  params: IPaginate;
}

export const okList = ({ data, count, error, params }: Props) => {
  return {
    data,
    count: count ?? 0,
    ...(params.page > 1 && {
      lastPage: params.page - 1,
    }),
    ...((count ?? 0) > params.page * params.pageSize && {
      nextPage: params.page + 1,
    }),
    ...(error?.message && {
      error: {
        name: error?.name,
        message: error?.message,
      },
    }),
  };
};

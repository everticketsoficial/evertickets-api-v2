import { IPaginate } from '../../types/http';

interface INextPaginate {
  total: number;
  params: IPaginate;
}
export const nextPaginate = ({ total, params }: INextPaginate) => {
  return {
    ...(params.page > 1 && {
      last: params.page - 1,
    }),
    ...((total ?? 0) > params.page * params.pageSize && {
      next: params.page + 1,
    }),
  };
};

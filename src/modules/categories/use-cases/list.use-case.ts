import { IPaginate } from '../../../types/http';
import { CategoryRepository } from '../repository';

export class ListCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (params: IPaginate) => {
    const { data, error, count } = await this._repository.list(params);
    return { data, error, count };
  };
}

import { CategoryRepository } from '../repository';
import { IUpdateCategoryUseCase } from '../types';

export class UpdateCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (body: IUpdateCategoryUseCase) => {
    const { data, error } = await this._repository.update(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

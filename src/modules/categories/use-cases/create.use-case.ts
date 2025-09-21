import { CategoryRepository } from '../repository';
import { ICreateCategoryUseCase } from '../types';

export class CreateCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (body: ICreateCategoryUseCase) => {
    const { data, error } = await this._repository.create(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

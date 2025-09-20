import { CategoryRepository } from '../repository';

export class DeleteCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (id: string) => {
    const { data, error } = await this._repository.delete(id);
    return { data, error };
  };
}

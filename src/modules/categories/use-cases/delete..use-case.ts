import { CategoryRepository } from '../repository';

export class DeleteCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (id: string) => {
    const { error } = await this._repository.delete(id);
    if (error) {
      return { error };
    }

    return {};
  };
}

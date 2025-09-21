import { CategoryRepository } from '../repository';

export class GetCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (id: string) => {
    const { data, error } = await this._repository.get(id);
    if (error) {
      return { error };
    }

    if (!data?.id) {
      return { data: undefined };
    }

    const item = {
      ...data,
      photo_url: '',
    };

    return { data: item };
  };
}

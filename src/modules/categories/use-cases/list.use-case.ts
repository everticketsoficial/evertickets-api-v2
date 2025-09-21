import { IPaginate } from '../../../types/http';
import { CategoryRepository } from '../repository';

export class ListCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (params: IPaginate) => {
    const { data, total, error } = await this._repository.list(params);
    if (error) {
      return { error };
    }

    const items = data.map(item => {
      return {
        ...item,
        // TODO: Ajustar a URL
        photo_url: '',
      };
    });

    return { data: items, total };
  };
}

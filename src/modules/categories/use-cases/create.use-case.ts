import { CategoryRepository } from '../repository';
import { ICreateCategoryUseCase } from '../types';

export class CreateCategoryUseCase {
  constructor(private readonly _repository: CategoryRepository) {}

  execute = async (body: ICreateCategoryUseCase) => {
    const resultCreate = await this._repository.create(body);
    if (resultCreate?.error) {
      // TODO: Deletar imagem
      return { error: resultCreate.error };
    }

    // TODO: Mover imagem para a pasta /uploads/categories
    return { data: resultCreate.data };
  };
}

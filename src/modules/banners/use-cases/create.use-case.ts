import { BannerRepository } from '../repository';
import { ICreateBannerUseCase } from '../types';

export class CreateBannerUseCase {
  constructor(private readonly _repository: BannerRepository) {}

  execute = async (body: ICreateBannerUseCase) => {
    const { data, error } = await this._repository.create(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

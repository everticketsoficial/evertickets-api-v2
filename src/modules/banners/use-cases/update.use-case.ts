import { BannerRepository } from '../repository';
import { IUpdateBannerUseCase } from '../types';

export class UpdateBannerUseCase {
  constructor(private readonly _repository: BannerRepository) {}

  execute = async (body: IUpdateBannerUseCase) => {
    const { data, error } = await this._repository.update(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

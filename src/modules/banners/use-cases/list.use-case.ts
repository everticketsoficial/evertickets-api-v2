import { IPaginate } from '../../../types/http';
import { BannerRepository } from '../repository';

export class ListBannerUseCase {
  constructor(private readonly _repository: BannerRepository) {}

  execute = async (params: IPaginate) => {
    const { data, total, error } = await this._repository.list(params);
    if (error) {
      return { error };
    }

    return { data, total };
  };
}

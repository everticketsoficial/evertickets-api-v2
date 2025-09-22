import { BannerRepository } from '../repository';

export class GetBannerUseCase {
  constructor(private readonly _repository: BannerRepository) {}

  execute = async (id: string) => {
    const { data, error } = await this._repository.get(id);
    if (error) {
      return { error };
    }

    if (!data?.id) {
      return { data: undefined };
    }

    return { data };
  };
}

import { BannerRepository } from '../repository';

export class DeleteBannerUseCase {
  constructor(private readonly _repository: BannerRepository) {}

  execute = async (id: string) => {
    const { error } = await this._repository.delete(id);
    if (error) {
      return { error };
    }

    return {};
  };
}

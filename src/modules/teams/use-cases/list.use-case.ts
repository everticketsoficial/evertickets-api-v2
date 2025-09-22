import { IPaginate } from '../../../types/http';
import { TeamRepository } from '../repository';

export class ListTeamUseCase {
  constructor(private readonly _repository: TeamRepository) {}

  execute = async (params: IPaginate) => {
    const { data, total, error } = await this._repository.list(params);
    if (error) {
      return { error };
    }

    return { data, total };
  };
}

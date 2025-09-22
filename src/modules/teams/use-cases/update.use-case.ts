import { TeamRepository } from '../repository';
import { IUpdateTeamUseCase } from '../types';

export class UpdateTeamUseCase {
  constructor(private readonly _repository: TeamRepository) {}

  execute = async (body: IUpdateTeamUseCase) => {
    const { data, error } = await this._repository.update(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

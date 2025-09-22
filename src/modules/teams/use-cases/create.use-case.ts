import { TeamRepository } from '../repository';
import { ICreateTeamUseCase } from '../types';

export class CreateTeamUseCase {
  constructor(private readonly _repository: TeamRepository) {}

  execute = async (body: ICreateTeamUseCase) => {
    const { data, error } = await this._repository.create(body);
    if (error) {
      return { error };
    }

    return { data };
  };
}

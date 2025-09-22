import { TeamRepository } from '../repository';

export class GetTeamUseCase {
  constructor(private readonly _repository: TeamRepository) {}

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

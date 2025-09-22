import { TeamRepository } from '../repository';

export class DeleteTeamUseCase {
  constructor(private readonly _repository: TeamRepository) {}

  execute = async (id: string) => {
    const { error } = await this._repository.delete(id);
    if (error) {
      return { error };
    }

    return {};
  };
}

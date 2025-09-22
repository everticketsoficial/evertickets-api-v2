import { supabase } from '../../plugins/supabase';
import { nextPaginate } from '../../shared/utils/http';
import { IPaginate } from '../../types/http';

import { TeamRepository } from './repository';
import { ICreateTeamController, IUpdateTeamController } from './types';

import { ListTeamUseCase } from './use-cases/list.use-case';
import { GetTeamUseCase } from './use-cases/get..use-case';
import { CreateTeamUseCase } from './use-cases/create.use-case';
import { UpdateTeamUseCase } from './use-cases/update.use-case';
import { DeleteTeamUseCase } from './use-cases/delete..use-case';

const repository = new TeamRepository(supabase);
const listTeamUseCase = new ListTeamUseCase(repository);
const getTeamUseCase = new GetTeamUseCase(repository);
const createTeamUseCase = new CreateTeamUseCase(repository);
const updateTeamUseCase = new UpdateTeamUseCase(repository);
const deleteTeamUseCase = new DeleteTeamUseCase(repository);

export const ListTeamController = async (params: IPaginate) => {
  const { data, total, error } = await listTeamUseCase.execute(params);
  if (error) {
    return { error };
  }

  const { last, next } = nextPaginate({ total, params });
  return { data, total, last, next };
};

export const GetTeamController = async (id: string) => {
  const { data, error } = await getTeamUseCase.execute(id);
  if (error) {
    return { error };
  }

  return { data };
};

export const CreateTeamController = async (body: ICreateTeamController) => {
  const { data, error } = await createTeamUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const UpdateTeamController = async (body: IUpdateTeamController) => {
  const { data, error } = await updateTeamUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const DeleteTeamController = async (id: string) => {
  const { error } = await deleteTeamUseCase.execute(id);
  if (error) {
    return { error };
  }

  return {};
};

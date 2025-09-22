import { supabase } from '../../plugins/supabase';
import { nextPaginate } from '../../shared/utils/http';
import { IPaginate } from '../../types/http';

import { BannerRepository } from './repository';
import { ICreateBannerController, IUpdateBannerController } from './types';

import { ListBannerUseCase } from './use-cases/list.use-case';
import { GetBannerUseCase } from './use-cases/get..use-case';
import { CreateBannerUseCase } from './use-cases/create.use-case';
import { UpdateBannerUseCase } from './use-cases/update.use-case';
import { DeleteBannerUseCase } from './use-cases/delete..use-case';

const repository = new BannerRepository(supabase);
const listBannerUseCase = new ListBannerUseCase(repository);
const getBannerUseCase = new GetBannerUseCase(repository);
const createBannerUseCase = new CreateBannerUseCase(repository);
const updateBannerUseCase = new UpdateBannerUseCase(repository);
const deleteBannerUseCase = new DeleteBannerUseCase(repository);

export const ListBannerController = async (params: IPaginate) => {
  const { data, total, error } = await listBannerUseCase.execute(params);
  if (error) {
    return { error };
  }

  const { last, next } = nextPaginate({ total, params });
  return { data, total, last, next };
};

export const GetBannerController = async (id: string) => {
  const { data, error } = await getBannerUseCase.execute(id);
  if (error) {
    return { error };
  }

  return { data };
};

export const CreateBannerController = async (body: ICreateBannerController) => {
  const { data, error } = await createBannerUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const UpdateBannerController = async (body: IUpdateBannerController) => {
  const { data, error } = await updateBannerUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const DeleteBannerController = async (id: string) => {
  const { error } = await deleteBannerUseCase.execute(id);
  if (error) {
    return { error };
  }

  return {};
};

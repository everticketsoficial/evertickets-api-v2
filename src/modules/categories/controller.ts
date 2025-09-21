import { supabase } from '../../plugins/supabase';
import { nextPaginate } from '../../shared/utils/http';
import { IPaginate } from '../../types/http';

import { CategoryRepository } from './repository';
import { ICreateCategoryController, IUpdateCategoryController } from './types';

import { ListCategoryUseCase } from './use-cases/list.use-case';
import { GetCategoryUseCase } from './use-cases/get..use-case';
import { CreateCategoryUseCase } from './use-cases/create.use-case';
import { UpdateCategoryUseCase } from './use-cases/update.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete..use-case';

const repository = new CategoryRepository(supabase);
const listCategoryUseCase = new ListCategoryUseCase(repository);
const getCategoryUseCase = new GetCategoryUseCase(repository);
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const updateCategoryUseCase = new UpdateCategoryUseCase(repository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

export const ListCategoryController = async (params: IPaginate) => {
  const { data, total, error } = await listCategoryUseCase.execute(params);
  if (error) {
    return { error };
  }

  const { last, next } = nextPaginate({ total, params });
  return { data, total, last, next };
};

export const GetCategoryController = async (id: string) => {
  const { data, error } = await getCategoryUseCase.execute(id);
  if (error) {
    return { error };
  }

  return { data };
};

export const CreateCategoryController = async (body: ICreateCategoryController) => {
  const { data, error } = await createCategoryUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const UpdateCategoryController = async (body: IUpdateCategoryController) => {
  const { data, error } = await updateCategoryUseCase.execute(body);
  if (error) {
    return { error };
  }

  return { data };
};

export const DeleteCategoryController = async (id: string) => {
  const { data, error } = await deleteCategoryUseCase.execute(id);
  if (error) {
    return { error };
  }

  return { data };
};

import { supabase } from '../../plugins/supabase';
import { ok, okList } from '../../shared/utils/http';
import { IList, IPaginate, IResult } from '../../types/http';

import { CategoryRepository } from './repository';
import { ICreateCategoryController } from './types';

import { ListCategoryUseCase } from './use-cases/list.use-case';
import { CreateCategoryUseCase } from './use-cases/create.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete..use-case';

const repository = new CategoryRepository(supabase);
const listCategoryUseCase = new ListCategoryUseCase(repository);
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

export const ListCategoryController = async (params: IPaginate): Promise<IList> => {
  const { data, count, error } = await listCategoryUseCase.execute(params);
  return okList({ data, count, error, params });
};

export const CreateCategoryController = async (body: ICreateCategoryController): Promise<IResult> => {
  const { data, error } = await createCategoryUseCase.execute(body);
  return ok({ data, error });
};

export const DeleteCategoryController = async (id: string): Promise<IList> => {
  const { data, error } = await deleteCategoryUseCase.execute(id);
  return ok({ data, error });
};

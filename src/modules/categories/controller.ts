import { supabase } from '../../plugins/supabase';
import { okList } from '../../shared/utils/http';
import { IList, IPaginate, IResult } from '../../types/http';

import { CategoryRepository } from './repository';
import { ICreateCategoryController } from './types';

import { CreateCategoryUseCase } from './use-cases/create.use-case';
import { ListCategoryUseCase } from './use-cases/list.use-case';

const repository = new CategoryRepository(supabase);
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const listCategoryUseCase = new ListCategoryUseCase(repository);

export const CreateCategoryController = async (body: ICreateCategoryController): Promise<IResult> => {
  const newResource = await createCategoryUseCase.execute(body);
  return {
    data: newResource.data,
    error: {
      name: '',
      message: '',
    },
  };
};

export const ListCategoryController = async (params: IPaginate): Promise<IList> => {
  const { data, count, error } = await listCategoryUseCase.execute(params);
  return okList({ data, count, error, params });
};

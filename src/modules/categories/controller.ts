import { supabase } from '../../plugins/supabase';
import { IResult } from '../../types/http';

import { CategoryRepository } from './repository';
import { ICreateCategoryController } from './types';

import { CreateCategoryUseCase } from './use-cases/create.use-case';

const repository = new CategoryRepository(supabase);
const createCategoryUseCase = new CreateCategoryUseCase(repository);

export const CreateCategoryController = async (
  body: ICreateCategoryController
): Promise<IResult> => {
  const newResource = await createCategoryUseCase.execute(body);
  return {
    data: newResource.data,
    error: {
      name: '',
      message: '',
    },
  };
};

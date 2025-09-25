import { supabase } from '../../plugins/supabase';
import { nextPaginate } from '../../shared/utils/http';
import { IPaginate } from '../../types/http';

import { formatUniqueConstraintError } from '../../core/messages';

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
  const listCategory = await listCategoryUseCase.execute(params);
  if (listCategory?.error) {
    return { error: listCategory.error.message };
  }

  const { last, next } = nextPaginate({ total: listCategory.total, params });
  return {
    data: listCategory.data,
    total: listCategory.total,
    last,
    next,
  };
};

export const GetCategoryController = async (id: string) => {
  const getCategory = await getCategoryUseCase.execute(id);
  if (getCategory?.error) {
    return { error: getCategory.error.message };
  }

  return { data: getCategory.data };
};

export const CreateCategoryController = async (body: ICreateCategoryController) => {
  const createCategory = await createCategoryUseCase.execute(body);
  if (createCategory?.error) {
    switch (createCategory.error.code) {
      case '23505':
        return { error: formatUniqueConstraintError(createCategory.error.name) };
      default:
        break;
    }

    return { error: createCategory.error.message };
  }

  return { data: createCategory.data };
};

export const UpdateCategoryController = async (body: IUpdateCategoryController) => {
  const updateCategory = await updateCategoryUseCase.execute(body);
  if (updateCategory?.error) {
    return { error: updateCategory.error.message };
  }

  return { data: updateCategory.data };
};

export const DeleteCategoryController = async (id: string) => {
  const deleteCategory = await deleteCategoryUseCase.execute(id);
  if (deleteCategory?.error) {
    return { error: deleteCategory.error.message };
  }

  return {};
};

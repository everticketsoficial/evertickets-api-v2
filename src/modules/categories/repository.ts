import { SupabaseClient } from '@supabase/supabase-js';

import { IPaginate, IRepositoryResult } from '../../types/http';

import {
  ICreateCategoryDatabase,
  ICreateCategoryRepository,
  IListCategoryRepository,
  IUpdateCategoryDatabase,
  IUpdateCategoryRepository,
} from './types';

export class CategoryRepository {
  constructor(private readonly _supabase: SupabaseClient) {}

  list = async ({ page, pageSize }: IPaginate): Promise<IRepositoryResult<IListCategoryRepository[]>> => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this._supabase
      .from('categories')
      .select<'*', IListCategoryRepository>('*', { count: 'exact' })
      .range(from, to);

    return { data, error, count };
  };

  create = async (body: ICreateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .insert(body)
      .select()
      .maybeSingle<ICreateCategoryDatabase>();

    return { data, error };
  };

  update = async (body: IUpdateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .update(body)
      .eq('id', body.id)
      .select()
      .maybeSingle<IUpdateCategoryDatabase>();

    return { data, error };
  };

  delete = async (id: string) => {
    const { data, error } = await this._supabase.from('categories').delete().eq('id', id);

    return { data, error };
  };
}

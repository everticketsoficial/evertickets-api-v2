import { SupabaseClient } from '@supabase/supabase-js';

import { IPaginate } from '../../types/http';

import {
  ICreateCategoryDatabase,
  ICreateCategoryRepository,
  IGetCategoryDatabase,
  IListCategoryDatabase,
  IUpdateCategoryDatabase,
  IUpdateCategoryRepository,
} from './types';

export class CategoryRepository {
  constructor(private readonly _supabase: SupabaseClient) {}

  list = async ({ page, pageSize }: IPaginate) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this._supabase
      .from('categories')
      .select<'*', IListCategoryDatabase>('*', { count: 'exact' })
      .range(from, to);

    return { data, error, count };
  };

  get = async (id: string) => {
    const { data, error } = await this._supabase
      .from('categories')
      .select<'*', IGetCategoryDatabase>()
      .eq('id', id)
      .maybeSingle();

    return { data, error };
  };

  create = async (body: ICreateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .insert(body)
      .select<'*', ICreateCategoryDatabase>()
      .maybeSingle();

    return { data, error };
  };

  update = async (body: IUpdateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .update(body)
      .eq('id', body.id)
      .select<'*', IUpdateCategoryDatabase>()
      .maybeSingle();

    return { data, error };
  };

  delete = async (id: string) => {
    const { data, error } = await this._supabase.from('categories').delete().eq('id', id);

    return { data, error };
  };
}

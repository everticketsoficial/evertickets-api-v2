import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '../../types/supabase';
import { IPaginate } from '../../types/http';

import { ICreateCategoryRepository, IUpdateCategoryRepository } from './types';

export class CategoryRepository {
  constructor(private readonly _supabase: SupabaseClient<Database>) {}

  list = async ({ page, pageSize }: IPaginate) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this._supabase
      .from('categories')
      .select('*', { count: 'exact' })
      .order('order')
      .range(from, to);

    return {
      data: data ?? [],
      total: count ?? 0,
      ...(error?.name && {
        error: {
          name: error.name,
          message: error.message,
        },
      }),
    };
  };

  get = async (id: string) => {
    const { data, error } = await this._supabase.from('categories').select().eq('id', id).maybeSingle();

    return {
      data,
      ...(error?.name && {
        error: {
          name: error.name,
          message: error.message,
        },
      }),
    };
  };

  create = async (body: ICreateCategoryRepository) => {
    const { data, error } = await this._supabase.from('categories').insert(body).select().maybeSingle();

    return {
      data,
      ...((error?.name || error?.details) && {
        error: {
          code: error.code,
          name: error.name || error?.details,
          message: error.message,
        },
      }),
    };
  };

  update = async (body: IUpdateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .update(body)
      .eq('id', body.id)
      .select()
      .maybeSingle();

    return {
      data,
      ...(error?.name && {
        error: {
          name: error.name,
          message: error.message,
        },
      }),
    };
  };

  delete = async (id: string) => {
    const { error } = await this._supabase.from('categories').delete().eq('id', id);

    return {
      ...(error?.name && {
        error: {
          name: error.name,
          message: error.message,
        },
      }),
    };
  };
}

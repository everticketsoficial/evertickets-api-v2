import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '../../types/supabase';
import { IPaginate } from '../../types/http';

import { ICreateBannerRepository, IUpdateBannerRepository } from './types';

export class BannerRepository {
  constructor(private readonly _supabase: SupabaseClient<Database>) {}

  list = async ({ page, pageSize }: IPaginate) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await this._supabase
      .from('banners')
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
    const { data, error } = await this._supabase.from('banners').select().eq('id', id).maybeSingle();

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

  create = async (body: ICreateBannerRepository) => {
    const { data, error } = await this._supabase.from('banners').insert(body).select().maybeSingle();

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

  update = async (body: IUpdateBannerRepository) => {
    const { data, error } = await this._supabase
      .from('banners')
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
    const { error } = await this._supabase.from('banners').delete().eq('id', id);

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

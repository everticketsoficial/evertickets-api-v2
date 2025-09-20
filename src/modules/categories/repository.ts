import { SupabaseClient } from '@supabase/supabase-js';

import {
  ICreateCategoryDatabase,
  ICreateCategoryRepository,
} from './types';

export class CategoryRepository {
  constructor(private readonly _supabase: SupabaseClient) {}

  create = async (body: ICreateCategoryRepository) => {
    const { data, error } = await this._supabase
      .from('categories')
      .insert(body)
      .select()
      .maybeSingle<ICreateCategoryDatabase>();

    return { data, error };
  };
}

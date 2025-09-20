import { z } from 'zod/v4';

import { Database } from '../../types/supabase';

import {
  createCategoryResultSchema,
  createCategorySchema,
} from './schema';

export type ICreateCategoryController = z.infer<typeof createCategorySchema>;
export type ICreateCategoryUseCase = ICreateCategoryController;
export type ICreateCategoryRepository = ICreateCategoryUseCase;
export type ICreateCategoryDatabase = Database['public']['Tables']['categories']['Row'];
export type ICreateCategoryControllerRes = z.infer<typeof createCategoryResultSchema>;

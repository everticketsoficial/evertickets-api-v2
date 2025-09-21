import { z } from 'zod/v4';

import { Database } from '../../types/supabase';

import {
  createCategoryResultSchema,
  createCategorySchema,
  listCategoryResultSchema,
  updateCategoryResultSchema,
  updateCategorySchema,
} from './schema';

export type ICreateCategoryController = z.infer<typeof createCategorySchema>;
export type ICreateCategoryUseCase = ICreateCategoryController;
export type ICreateCategoryRepository = Database['public']['Tables']['categories']['Insert'];

export type IUpdateCategoryController = z.infer<typeof updateCategorySchema> & { id: string };
export type IUpdateCategoryUseCase = IUpdateCategoryController;
export type IUpdateCategoryRepository = Database['public']['Tables']['categories']['Update'] & { id: string };

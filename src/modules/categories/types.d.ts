import { z } from 'zod/v4';

import { Database } from '../../types/supabase';

import {
  createCategoryResultSchema,
  createCategorySchema,
  listCategoryResultSchema,
  updateCategoryResultSchema,
  updateCategorySchema,
} from './schema';

export type IListCategoryRepository = z.infer<typeof createCategoryResultSchema>;

export type ICreateCategoryController = z.infer<typeof createCategorySchema>;
export type ICreateCategoryUseCase = ICreateCategoryController;
export type ICreateCategoryRepository = ICreateCategoryUseCase;
export type ICreateCategoryDatabase = Database['public']['Tables']['categories']['Row'];
export type ICreateCategoryControllerRes = z.infer<typeof createCategoryResultSchema>;

export type IUpdateCategoryController = z.infer<typeof updateCategorySchema> & { id: string };
export type IUpdateCategoryUseCase = IUpdateCategoryController;
export type IUpdateCategoryRepository = IUpdateCategoryUseCase;
export type IUpdateCategoryDatabase = Database['public']['Tables']['categories']['Row'];
export type IUpdateCategoryControllerRes = z.infer<typeof updateCategoryResultSchema>;

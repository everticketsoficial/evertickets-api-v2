import { z } from 'zod/v4';

import { Database } from '../../types/supabase';

import {
  createBannerResultSchema,
  createBannerSchema,
  listBannerResultSchema,
  updateBannerResultSchema,
  updateBannerSchema,
} from './schema';

export type ICreateBannerController = z.infer<typeof createBannerSchema>;
export type ICreateBannerUseCase = ICreateBannerController;
export type ICreateBannerRepository = Database['public']['Tables']['banners']['Insert'];

export type IUpdateBannerController = z.infer<typeof updateBannerSchema> & { id: string };
export type IUpdateBannerUseCase = IUpdateBannerController;
export type IUpdateBannerRepository = Database['public']['Tables']['banners']['Update'] & { id: string };

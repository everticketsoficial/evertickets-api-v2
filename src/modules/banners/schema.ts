import { z } from 'zod/v4';

export const createBannerSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
  photo_url: z.string(),
  link: z.string(),
  order: z.number().positive('A ordem deve ser maior que zero'),
  active: z.boolean().default(false),
});

export const createBannerResultSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  photo_url: z.string(),
  link: z.string(),
  order: z.number(),
  active: z.boolean(),
});

export const updateBannerSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
  photo_url: z.string(),
  link: z.string(),
  order: z.number().positive('A ordem deve ser maior que zero'),
  active: z.boolean().default(false),
});

export const updateBannerResultSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  photo_url: z.string(),
  link: z.string(),
  order: z.number(),
  active: z.boolean(),
});

export const getBannerResultSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  photo_url: z.string(),
  link: z.string(),
  order: z.number(),
  active: z.boolean(),
});

export const listBannerResultSchema = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
    photo_url: z.string(),
    link: z.string(),
    order: z.number(),
    active: z.boolean(),
  })
);

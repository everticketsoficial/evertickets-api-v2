import { z } from 'zod/v4';

export const createCategorySchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(48, 'Máximo de 48 caracteres'),
  description: z.string().optional(),
  order: z.number().positive('A ordem deve ser maior que zero'),
  photo_url: z.string(),
  active: z.boolean().default(false),
  highlighted: z.boolean().default(false),
});
export const createCategoryResultSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  order: z.number(),
  photo_url: z.string(),
  active: z.boolean(),
  highlighted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(48, 'Máximo de 48 caracteres'),
  description: z.string().optional(),
  order: z.number().positive('A ordem deve ser maior que zero'),
  photo_url: z.string(),
  active: z.boolean().default(false),
  highlighted: z.boolean().default(false),
});
export const updateCategoryResultSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  order: z.number(),
  photo_url: z.string(),
  active: z.boolean(),
  highlighted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const getCategoryResultSchema = createCategoryResultSchema;
export const listCategoryResultSchema = z.array(createCategoryResultSchema);

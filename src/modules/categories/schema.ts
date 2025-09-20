import { z } from 'zod/v4';

export const createCategorySchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
  description: z.string().optional(),
  order: z.number().positive('A ordem deve ser maior que zero'),
  photo_url: z.string(),
  active: z.boolean().default(false),
  highlighted: z.boolean().default(false),
});
export const createCategoryResultSchema = createCategorySchema.extend({
  id: z.uuid(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const listCategoryResultSchema = z.array(createCategoryResultSchema);

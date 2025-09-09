import { z } from 'zod/v4';

export const categoryCreateScheme = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const categoryCreateResultScheme = z.object({
  id: z.uuidv4(),
  name: z.string(),
  description: z.string().optional(),
  isFeatured: z.boolean(),
});

export const categoryUpdateScheme = z.object({
  id: z.uuidv4(),
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const categoryUpdateResultScheme = categoryCreateResultScheme;

export const categoryGetResultScheme = categoryCreateResultScheme;
export const categoryListResultScheme = z.array(categoryCreateResultScheme);

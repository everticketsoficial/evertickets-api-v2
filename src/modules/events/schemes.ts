import { z } from 'zod/v4';

export const eventCreateScheme = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
});

export const eventCreateResultScheme = z.object({
  id: z.uuidv4(),
  name: z.string(),
});

export const eventUpdateScheme = z.object({
  id: z.uuidv4(),
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(32, 'Mínimo de 32 caracteres'),
});

export const eventUpdateResultScheme = eventCreateResultScheme;

export const eventGetResultScheme = eventCreateResultScheme;
export const eventListResultScheme = z.array(eventCreateResultScheme);

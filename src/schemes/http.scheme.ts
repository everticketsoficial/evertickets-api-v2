import { z } from 'zod/v4';

export const defaultError = z.object({
  name: z.string(),
  message: z.string(),
});

export const paramsScheme = z.object({
  id: z.uuidv4(),
});

export const paginateScheme = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(10),
});

export const defaultResponse200 = <T = z.ZodObject | z.ZodArray>(data: T) => ({
  200: z.object({
    data,
    ...(data instanceof z.ZodArray && {
      total: z.number(),
      last: z.number().optional(),
      next: z.number().optional(),
    }),
  }),
});

export const defaultResponse201 = <T = z.ZodObject>(data?: T) => ({
  201: z.object({
    ...(data != undefined && {
      data,
    }),
  }),
});

export const defaultResponse400 = {
  400: z.object({
    error: defaultError,
  }),
};

export const defaultResponse401 = {
  401: z.object({
    error: defaultError,
  }),
};

export const defaultResponse404 = {
  404: z.object({
    error: defaultError,
  }),
};

export const defaultResponse500 = {
  500: z.object({
    error: defaultError,
  }),
};

import { z } from 'zod/v4';

export const defaultError = z.object({
  name: z.string(),
  message: z.string(),
});

export const paramsScheme = z.object({
  id: z.uuidv4(),
});

export const defaultResponse200 = (data?: z.ZodObject | z.ZodArray) => ({
  200: z.object({
    statusCode: z.number().default(200),
    ...(data != undefined && {
      data,
      count: z.number().optional(),
    }),
  }),
});

export const defaultResponse400 = {
  400: z.object({
    statusCode: z.number().default(400),
    error: defaultError,
  }),
};

export const defaultResponse401 = {
  401: z.object({
    statusCode: z.number().default(401),
    error: defaultError,
  }),
};

export const defaultResponse404 = {
  404: z.object({
    statusCode: z.number().default(404),
    error: defaultError,
  }),
};

export const defaultResponse500 = {
  500: z.object({
    statusCode: z.number().default(500),
    error: defaultError,
  }),
};

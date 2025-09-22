import { z } from 'zod/v4';

import { Database } from '../../types/supabase';

import {
  createTeamResultSchema,
  createTeamSchema,
  listTeamResultSchema,
  updateTeamResultSchema,
  updateTeamSchema,
} from './schema';

export type ICreateTeamController = z.infer<typeof createTeamSchema>;
export type ICreateTeamUseCase = ICreateTeamController;
export type ICreateTeamRepository = Database['public']['Tables']['teams']['Insert'];

export type IUpdateTeamController = z.infer<typeof updateTeamSchema> & { id: string };
export type IUpdateTeamUseCase = IUpdateTeamController;
export type IUpdateTeamRepository = Database['public']['Tables']['teams']['Update'] & { id: string };

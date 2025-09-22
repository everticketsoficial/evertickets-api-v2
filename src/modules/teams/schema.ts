import { z } from 'zod/v4';

import { Constants } from '../../types/supabase';

// TODO: Verificar se uuidv4 é melhor que ulid
export const createTeamSchema = z.object({
  producer_id: z.uuidv4(),
  staff_id: z.uuidv4(),
  status: z.enum(Constants.public.Enums.team_status_enum),
});

export const createTeamResultSchema = z.object({
  id: z.uuid(),
  producer_id: z.uuidv4(),
  staff_id: z.uuidv4(),
  status: z.enum(Constants.public.Enums.team_status_enum),
});

// TODO: Update deve atualizar apenas o status
export const updateTeamSchema = z.object({
  producer_id: z.uuidv4(),
  staff_id: z.uuidv4(),
  status: z.enum(Constants.public.Enums.team_status_enum),
});

export const updateTeamResultSchema = z.object({
  id: z.uuid(),
  producer_id: z.uuidv4(),
  staff_id: z.uuidv4(),
  status: z.enum(Constants.public.Enums.team_status_enum),
});

export const getTeamResultSchema = z.object({
  id: z.uuid(),
  // TODO: Incluir dados do produtor
  producer_id: z.uuidv4(),
  // TODO: Incluir dados do staff
  staff_id: z.uuidv4(),
  status: z.enum(Constants.public.Enums.team_status_enum),
});

export const listTeamResultSchema = z.array(
  z.object({
    id: z.uuid(),
    // TODO: Incluir dados do produtor
    producer_id: z.uuidv4(),
    // TODO: Incluir dados do staff
    staff_id: z.uuidv4(),
    status: z.enum(Constants.public.Enums.team_status_enum),
  })
);

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'> & {
      email: string;
    };
  }

  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

export { supabase };

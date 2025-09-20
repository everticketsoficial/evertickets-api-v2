import fp from 'fastify-plugin';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default fp(async fastify => {
  fastify.decorate('supabase', supabase);
});

declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
  }
}

export { supabase };

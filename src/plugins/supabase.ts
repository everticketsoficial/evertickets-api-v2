import fp from "fastify-plugin";
import { createClient } from "@supabase/supabase-js";

export default fp(async (fastify) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  fastify.decorate("supabase", supabase as any);
});

declare module "fastify" {
  interface FastifyInstance {
    supabase: ReturnType<typeof createClient>;
  }
}

import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../auth';

export default async function categoryRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authMiddleware);

  fastify.post('/', async (request, reply) => {
    const { name } = request.body as { name: string };

    if (!name) {
      return reply.status(400).send({ rror: true, message: 'Nome é obrigatório' });
    }

    const { data, error } = await fastify.supabase
      .from('categories')
      // .upsert({
      //   name,
      //   user_id: request.user.id,
      // })
      .select();

    if (error) {
      return reply.status(500).send(error);
    }

    return reply.status(201).send(data[0]);
  });

  // Listar categorias
  fastify.get('/', async (request, reply) => {
    const { data, error } = await fastify.supabase.from('categories').select('*').eq('user_id', request.user.id);
    if (error) {
      return reply.status(500).send(error);
    }

    return reply.send(data);
  });
}

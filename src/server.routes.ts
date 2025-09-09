import { fastify } from './server.config';
import categoryRoutes from './routes/categories';

fastify.register(categoryRoutes, { prefix: '/categories' });

fastify.get('/ping', async (request, reply) => {
  return 'pong\n';
});

import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fastifyStatic } from '@fastify/static';

import { fastify } from './server.config';
import categoryRoutes from './routes/categories';

const dirPublic = path.join(__dirname, '..', 'public');
if (!existsSync(dirPublic)) {
  mkdirSync(dirPublic);
}

fastify.register(fastifyStatic, {
  root: dirPublic,
  prefix: '/',
});

fastify.register(categoryRoutes, { prefix: '/categories' });

fastify.get('/ping', async (request, reply) => {
  return 'pong\n';
});

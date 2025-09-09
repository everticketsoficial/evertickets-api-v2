'reflect-metadata';

import Fastify from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { fastifyCors } from '@fastify/cors';

import supabasePlugin from './plugins/supabase';
import categoryRoutes from './routes/categories';

const fastify = Fastify({ logger: true });

fastify.register(fastifyJwt, {
  secret: 'supersecret',
});

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(supabasePlugin);

fastify.register(categoryRoutes, { prefix: '/categories' });

fastify.get('/ping', async (request, reply) => {
  return 'pong\n';
});

const port = Number(process.env.PORT || 3000);
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`🚀 Servidor rodando em ${address}`);
});

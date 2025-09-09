import Fastify from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { fastifyCors } from '@fastify/cors';

import supabasePlugin from './plugins/supabase';

const fastify = Fastify({ logger: true });

fastify.register(fastifyJwt, {
  secret: 'supersecret',
});

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(supabasePlugin);

export { fastify };

import Fastify from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { fastifyCors } from '@fastify/cors';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.register(fastifyJwt, {
  secret: 'supersecret',
});

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

export { fastify };

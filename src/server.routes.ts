import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fastifyStatic } from '@fastify/static';

import { fastify } from './server.config';
import routes from './modules/routes';

const dirPublic = path.join(__dirname, '..', 'public');
if (!existsSync(dirPublic)) {
  mkdirSync(dirPublic, { recursive: true });
}

const uploadsPublic = path.join(__dirname, '..', 'uploads');
if (!existsSync(uploadsPublic)) {
  mkdirSync(uploadsPublic, { recursive: true });
}

fastify.register(fastifyStatic, {
  root: dirPublic,
  prefix: '/',
});

fastify.register(fastifyStatic, {
  root: uploadsPublic,
  prefix: '/uploads',
  decorateReply: false
});

fastify.register(routes);

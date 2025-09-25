import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { fastifyStatic } from '@fastify/static';

import { fastify } from './server.config';
import routes from './modules/routes';

const dirPublic = path.join(__dirname, '..', 'public');
if (!existsSync(dirPublic)) {
  mkdirSync(dirPublic, { recursive: true });
}

fastify.register(fastifyStatic, {
  root: dirPublic,
  prefix: '/',
});

fastify.register(routes);

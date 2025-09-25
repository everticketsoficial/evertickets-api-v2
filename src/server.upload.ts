import { fastifyMultipart } from '@fastify/multipart';

import { fastify } from './server.config';

fastify.register(fastifyMultipart, {
  attachFieldsToBody: 'keyValues',
  limits: {
    fileSize: 1 * 1024 * 1024,
    files: 1,
  },
});

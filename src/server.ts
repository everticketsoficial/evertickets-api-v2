'reflect-metadata';

import { fastify } from './server.config';
import './server.swagger';
import './server.error';
import './server.routes';

const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach(signal => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

(async () => {
  try {
    const port = Number(process.env.PORT || 3000);

    await fastify.ready();
    const address = await fastify.listen({ port });

    console.log(`🚀 Servidor rodando em ${address}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();

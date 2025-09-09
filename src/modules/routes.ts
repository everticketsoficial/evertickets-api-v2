import { FastifyTypedInstance } from '@/types/fastify';

import categoryRoutes from './categories/routes';
import eventRoutes from './events/routes';

const routes = async (app: FastifyTypedInstance) => {
  app.get('/', async () => {
    return { error: false, message: 'Hello world' };
  });

  app.register(categoryRoutes, { prefix: 'api/v1/category' });
  app.register(eventRoutes, { prefix: 'api/v1/event' });
};

export default routes;

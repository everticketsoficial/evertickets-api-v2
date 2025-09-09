import { FastifyTypedInstance } from '@/types/fastify';

import categoryRoutes from './categories/routes';

const routes = async (app: FastifyTypedInstance) => {
  app.get('/', async () => {
    return { error: false, message: 'Hello world' };
  });

  app.register(categoryRoutes, { prefix: 'api/v1/category' });
};

export default routes;

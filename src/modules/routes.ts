import { FastifyTypedInstance } from '../types/fastify';

import bannerRoutes from './banners/routes';
import categoryRoutes from './categories/routes';
import eventRoutes from './events/routes';

const routes = async (app: FastifyTypedInstance) => {
  app.get('/', async () => {
    return { data: 'Hello world' };
  });

  app.register(bannerRoutes, { prefix: 'api/v1/banner' });
  app.register(categoryRoutes, { prefix: 'api/v1/category' });
  // app.register(eventRoutes, { prefix: 'api/v1/event' });
};

export default routes;

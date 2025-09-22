import { FastifyTypedInstance } from '../types/fastify';

import bannerRoutes from './banners/routes';
import categoryRoutes from './categories/routes';
import eventRoutes from './events/routes';
import teamRoutes from './teams/routes';

const routes = async (app: FastifyTypedInstance) => {
  app.get('/', async () => {
    return { data: 'Hello world' };
  });

  app.register(bannerRoutes, { prefix: 'api/v1' });
  app.register(categoryRoutes, { prefix: 'api/v1' });
  // app.register(eventRoutes, { prefix: 'api/v1/event' });
  app.register(teamRoutes, { prefix: 'api/v1' });
};

export default routes;

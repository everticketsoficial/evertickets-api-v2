import { authMiddleware } from '../../auth';
import { adminMiddleware } from '../../core/middlewares/admin';

import {
  defaultResponse200,
  defaultResponse201,
  defaultResponse400,
  defaultResponse401,
  defaultResponse404,
  defaultResponse500,
  paginateScheme,
  paramsScheme,
} from '../../schemes/http.scheme';

import { FastifyTypedInstance } from '../../types/fastify';

import {
  createBannerSchema,
  createBannerResultSchema,
  getBannerResultSchema,
  listBannerResultSchema,
  updateBannerSchema,
  updateBannerResultSchema,
} from './schema';

import {
  CreateBannerController,
  DeleteBannerController,
  GetBannerController,
  ListBannerController,
  UpdateBannerController,
} from './controller';

const routes = async (app: FastifyTypedInstance) => {
  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Banner'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listBannerResultSchema>(listBannerResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { data, error, total, last, next } = await ListBannerController(req.query);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(200).send({ data, total, last, next });
    },
  });

  // GET /:id
  app.route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['Banner'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getBannerResultSchema>(getBannerResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await GetBannerController(id);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      if (!data?.id) {
        res.status(404).send({ error: 'O banner não foi encontrado' });
        return;
      }

      res.status(200).send({ data });
    },
  });

  // POST /
  app.route({
    method: 'POST',
    url: '',
    schema: {
      tags: ['Banner'],
      body: createBannerSchema,
      response: {
        ...defaultResponse201<typeof createBannerResultSchema>(createBannerResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { data, error } = await CreateBannerController(req.body);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(201).send({ data });
    },
  });

  // PUT /:id
  app.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Banner'],
      body: updateBannerSchema,
      params: paramsScheme,
      response: {
        ...defaultResponse201<typeof updateBannerResultSchema>(updateBannerResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      const resultGet = await GetBannerController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error.message });
        return;
      }

      if (!resultGet.data?.id) {
        res.status(404).send({ error: 'O banner não foi encontrado' });
        return;
      }

      const { data, error } = await UpdateBannerController({
        ...req.body,
        id,
      });
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(201).send({ data });
    },
  });

  // DELETE /:id
  app.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Banner'],
      params: paramsScheme,
      response: {
        ...defaultResponse201(),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      const resultGet = await GetBannerController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error.message });
        return;
      }

      if (!resultGet.data?.id) {
        res.status(404).send({ error: 'O banner não foi encontrado' });
        return;
      }

      const { error } = await DeleteBannerController(id);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(201).send();
    },
  });
};

export default routes;

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
  createCategorySchema,
  createCategoryResultSchema,
  getCategoryResultSchema,
  listCategoryResultSchema,
  updateCategorySchema,
  updateCategoryResultSchema,
} from './schema';

import {
  CreateCategoryController,
  DeleteCategoryController,
  GetCategoryController,
  ListCategoryController,
  UpdateCategoryController,
} from './controller';

const routes = async (app: FastifyTypedInstance) => {
  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Category'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listCategoryResultSchema>(listCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { data, error, total, last, next } = await ListCategoryController(req.query);
      if (error) {
        res.status(500).send({ error });
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
      tags: ['Category'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getCategoryResultSchema>(getCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await GetCategoryController(id);
      if (error) {
        res.status(500).send({ error });
        return;
      }

      if (!data?.id) {
        const newError = { name: 'Não encontrado', message: 'A categoria não foi encontrada' };
        res.status(404).send({ error: newError });
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
      tags: ['Category'],
      body: createCategorySchema,
      response: {
        ...defaultResponse201<typeof createCategoryResultSchema>(createCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { data, error } = await CreateCategoryController(req.body);
      if (error) {
        res.status(500).send({ error });
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
      tags: ['Category'],
      body: updateCategorySchema,
      params: paramsScheme,
      response: {
        ...defaultResponse201<typeof updateCategoryResultSchema>(updateCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      const resultGet = await GetCategoryController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error });
        return;
      }

      if (!resultGet.data?.id) {
        const newError = { name: 'Não encontrado', message: 'A categoria não foi encontrada' };
        res.status(404).send({ error: newError });
        return;
      }

      const { data, error } = await UpdateCategoryController({
        ...req.body,
        id,
      });
      if (error) {
        res.status(500).send({ error });
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
      tags: ['Category'],
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

      const resultGet = await GetCategoryController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error });
        return;
      }

      if (!resultGet.data?.id) {
        const newError = { name: 'Não encontrado', message: 'A categoria não foi encontrada' };
        res.status(404).send({ error: newError });
        return;
      }

      const { error } = await DeleteCategoryController(id);
      if (error) {
        res.status(500).send({ error });
        return;
      }

      res.status(201).send();
    },
  });
};

export default routes;

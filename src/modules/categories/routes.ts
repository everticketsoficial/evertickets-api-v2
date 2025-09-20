import { authMiddleware } from '../../auth';

import {
  defaultResponse200,
  defaultResponse201,
  defaultResponse400,
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
  app.addHook('preHandler', authMiddleware);

  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Category'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200(listCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { data, error } = await ListCategoryController(req.query);
      res.status(error?.name ? 500 : 200).send({ data });
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
        ...defaultResponse200(getCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await GetCategoryController(id);
      res.status(error?.name ? 500 : 200).send({ data });
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
        ...defaultResponse201(createCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { data, error } = await CreateCategoryController(req.body);
      res.status(error?.name ? 500 : 201).send({ data });
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
        ...defaultResponse201(updateCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await UpdateCategoryController({
        ...req.body,
        id,
      });
      res.status(error?.name ? 500 : 201).send({ data });
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
        ...defaultResponse200(),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await DeleteCategoryController(id);
      res.status(error?.name ? 500 : 200).send({ data });
    },
  });
};

export default routes;

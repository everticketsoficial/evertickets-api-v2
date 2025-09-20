import { authMiddleware } from '../../auth';

import {
  defaultResponse200,
  defaultResponse400,
  defaultResponse404,
  defaultResponse500,
  paramsScheme,
} from '../../schemes/http.scheme';

import { FastifyTypedInstance } from '../../types/fastify';

import {
  createCategorySchema,
  createCategoryResultSchema,
  categoryGetResultScheme,
  listCategoryResultSchema,
  categoryUpdateResultScheme,
  categoryUpdateScheme,
} from './schema';

import { CreateCategoryController, ListCategoryController } from './controller';

const routes = async (app: FastifyTypedInstance) => {
  app.addHook('preHandler', authMiddleware);

  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Category'],
      response: {
        ...defaultResponse200(listCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { page, pageSize } = req.query as any;
      const { data, error } = await ListCategoryController({
        page: Number(page ?? 1),
        pageSize: Number(pageSize ?? 10),
      });
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
        ...defaultResponse200(categoryGetResultScheme),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: (req, res) => {
      res.send({ data: {} });
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
      body: categoryUpdateScheme,
      params: paramsScheme,
      response: {
        ...defaultResponse200(categoryUpdateResultScheme),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: (req, res) => {
      res.send({ data: {} });
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
    handler: (req, res) => {
      res.send({ data: undefined });
    },
  });
};

export default routes;

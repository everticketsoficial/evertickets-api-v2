import { authMiddleware } from '@/auth';

import {
  defaultResponse200,
  defaultResponse400,
  defaultResponse404,
  defaultResponse500,
  paramsScheme,
} from '@/schemes/http.scheme';

import { FastifyTypedInstance } from '@/types/fastify';

import {
  categoryCreateResultScheme,
  categoryCreateScheme,
  categoryGetResultScheme,
  categoryListResultScheme,
  categoryUpdateResultScheme,
  categoryUpdateScheme,
} from './schemes';

const routes = async (app: FastifyTypedInstance) => {
  app.addHook('preHandler', authMiddleware);

  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Category'],
      response: {
        ...defaultResponse200(categoryListResultScheme),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: (req, res) => {
      res.send({ data: [] });
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
      body: categoryCreateScheme,
      response: {
        ...defaultResponse200(categoryCreateResultScheme),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: (req, res) => {
      res.send({ data: {} });
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

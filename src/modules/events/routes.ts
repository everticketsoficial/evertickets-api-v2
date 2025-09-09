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
  eventCreateResultScheme,
  eventCreateScheme,
  eventGetResultScheme,
  eventListResultScheme,
  eventUpdateResultScheme,
  eventUpdateScheme,
} from './schemes';

const routes = async (app: FastifyTypedInstance) => {
  app.addHook('preHandler', authMiddleware);

  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      response: {
        ...defaultResponse200(eventListResultScheme),
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
      params: paramsScheme,
      response: {
        ...defaultResponse200(eventGetResultScheme),
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
      body: eventCreateScheme,
      response: {
        ...defaultResponse200(eventCreateResultScheme),
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
      body: eventUpdateScheme,
      params: paramsScheme,
      response: {
        ...defaultResponse200(eventUpdateResultScheme),
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

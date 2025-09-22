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
  createTeamSchema,
  createTeamResultSchema,
  getTeamResultSchema,
  listTeamResultSchema,
  updateTeamSchema,
  updateTeamResultSchema,
} from './schema';

import {
  CreateTeamController,
  DeleteTeamController,
  GetTeamController,
  ListTeamController,
  UpdateTeamController,
} from './controller';

const routes = async (app: FastifyTypedInstance) => {
  // GET /
  app.route({
    method: 'GET',
    url: '',
    schema: {
      tags: ['Team'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listTeamResultSchema>(listTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { data, error, total, last, next } = await ListTeamController(req.query);
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
      tags: ['Team'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getTeamResultSchema>(getTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { data, error } = await GetTeamController(id);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      if (!data?.id) {
        res.status(404).send({ error: 'O time não foi encontrado' });
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
      tags: ['Team'],
      body: createTeamSchema,
      response: {
        ...defaultResponse201<typeof createTeamResultSchema>(createTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { data, error } = await CreateTeamController(req.body);
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
      tags: ['Team'],
      body: updateTeamSchema,
      params: paramsScheme,
      response: {
        ...defaultResponse201<typeof updateTeamResultSchema>(updateTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      const resultGet = await GetTeamController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error.message });
        return;
      }

      if (!resultGet.data?.id) {
        res.status(404).send({ error: 'O time não foi encontrado' });
        return;
      }

      const { data, error } = await UpdateTeamController({
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
      tags: ['Team'],
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

      const resultGet = await GetTeamController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error.message });
        return;
      }

      if (!resultGet.data?.id) {
        res.status(404).send({ error: 'O time não foi encontrado' });
        return;
      }

      const { error } = await DeleteTeamController(id);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(201).send();
    },
  });
};

export default routes;

import { authMiddleware } from '../../auth';
import { staffMiddleware } from '../../core/middlewares/staff';
import { producerMiddleware } from '../../core/middlewares/producer';
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
  updateTeamResultSchema,
  updateTeamSchema,
} from './schema';

import {
  CreateTeamController,
  DeleteTeamController,
  GetTeamController,
  ListTeamController,
  UpdateTeamController,
} from './controller';

const routes = async (app: FastifyTypedInstance) => {
  // GET /staff/team
  app.route({
    method: 'GET',
    url: '/staff/team',
    schema: {
      tags: ['Staff'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listTeamResultSchema>(listTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [authMiddleware, staffMiddleware],
    handler: async (req, res) => {
      // TODO: Verificar proprietário
      const { data, error, total, last, next } = await ListTeamController(req.query);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(200).send({ data, total, last, next });
    },
  });

  // GET /producer/team
  app.route({
    method: 'GET',
    url: '/producer/team',
    schema: {
      tags: ['Producer'],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listTeamResultSchema>(listTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [authMiddleware, producerMiddleware],
    handler: async (req, res) => {
      // TODO: Verificar proprietário
      const { data, error, total, last, next } = await ListTeamController(req.query);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(200).send({ data, total, last, next });
    },
  });

  // TODO: Remover
  // GET /staff/team/:id
  app.route({
    method: 'GET',
    url: '/staff/team/:id',
    schema: {
      tags: ['Staff'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getTeamResultSchema>(getTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
      preHandler: [authMiddleware, staffMiddleware],
    },
    handler: async (req, res) => {
      const { id } = req.params;

      // TODO: Verificar proprietário
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

  // TODO: Remover
  // GET /producer/team/:id
  app.route({
    method: 'GET',
    url: '/producer/team/:id',
    schema: {
      tags: ['Producer'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getTeamResultSchema>(getTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
      preHandler: [authMiddleware, producerMiddleware],
    },
    handler: async (req, res) => {
      const { id } = req.params;

      // TODO: Verificar proprietário
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

  // POST /producer/team
  app.route({
    method: 'POST',
    url: '/producer/team',
    schema: {
      tags: ['Producer'],
      body: createTeamSchema,
      response: {
        ...defaultResponse201<typeof createTeamResultSchema>(createTeamResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [authMiddleware, producerMiddleware],
    handler: async (req, res) => {
      // TODO: Verificar proprietário
      const { data, error } = await CreateTeamController(req.body);
      if (error) {
        res.status(500).send({ error: error.message });
        return;
      }

      res.status(201).send({ data });
    },
  });

  // TODO: Remover
  // PUT /producer/team/:id
  app.route({
    method: 'PUT',
    url: '/producer/team/:id',
    schema: {
      tags: ['Producer'],
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

  // TODO: Rota para atualizar status

  // DELETE /producer/team/:id
  app.route({
    method: 'DELETE',
    url: '/producer/team/:id',
    schema: {
      tags: ['Producer'],
      params: paramsScheme,
      response: {
        ...defaultResponse201(),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [authMiddleware, producerMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      // TODO: Verificar proprietário
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

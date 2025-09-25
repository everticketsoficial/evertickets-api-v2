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

import { uploadFile } from '../../server.upload';

const routes = async (app: FastifyTypedInstance) => {
  // GET /category
  app.route({
    method: 'GET',
    url: '/category',
    schema: {
      tags: [],
      querystring: paginateScheme,
      response: {
        ...defaultResponse200<typeof listCategoryResultSchema>(listCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse500,
      },
    },
    handler: async (req, res) => {
      const listCategory = await ListCategoryController(req.query);
      if (listCategory?.error) {
        res.status(500).send({ error: listCategory.error });
        return;
      }

      res.status(200).send({
        data: listCategory.data ?? [],
        total: listCategory.total,
        last: listCategory.last,
        next: listCategory.next,
      });
    },
  });

  // TODO: Listar categorias com os eventos

  // GET /admin/category/:id
  app.route({
    method: 'GET',
    url: '/admin/category/:id',
    schema: {
      tags: ['Admin'],
      params: paramsScheme,
      response: {
        ...defaultResponse200<typeof getCategoryResultSchema>(getCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse404,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;
      const getCategory = await GetCategoryController(id);
      if (getCategory?.error) {
        res.status(500).send({ error: getCategory.error });
        return;
      }

      if (!getCategory.data?.id) {
        res.status(404).send({ error: 'A categoria não foi encontrada' });
        return;
      }

      res.status(200).send({ data: getCategory.data });
    },
  });

  // POST /admin/category
  app.route({
    method: 'POST',
    url: '/admin/category',
    schema: {
      tags: ['Admin'],
      body: createCategorySchema,
      consumes: ['multipart/form-data'],
      response: {
        ...defaultResponse201<typeof createCategoryResultSchema>(createCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
    },
    // preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const body = req.body;

      const filename = await uploadFile({
        file: body['photo_url[file]'],
        filename: body['photo_url[filename]'],
      });

      const resultCreate = await CreateCategoryController({
        name: req.body.name,
        description: req.body.description,
        order: req.body.order,
        photo_url: filename,
        active: req.body.active,
        highlighted: req.body.highlighted,
      });
      if (resultCreate?.error) {
        res.status(500).send({ error: resultCreate.error });
        return;
      }

      res.status(201).send({ data: resultCreate.data });
    },
  });

  // PUT /admin/:id
  app.route({
    method: 'PUT',
    url: '/admin/category/:id',
    schema: {
      tags: ['Admin'],
      body: updateCategorySchema,
      params: paramsScheme,
      response: {
        ...defaultResponse201<typeof updateCategoryResultSchema>(updateCategoryResultSchema),
        ...defaultResponse400,
        ...defaultResponse401,
        ...defaultResponse404,
        ...defaultResponse500,
      },
      security: [{ bearerAuth: [] }],
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
        res.status(404).send({ error: 'A categoria não foi encontrada' });
        return;
      }

      const updateCategory = await UpdateCategoryController({
        ...req.body,
        id,
      });
      if (updateCategory?.error) {
        res.status(500).send({ error: updateCategory.error });
        return;
      }

      res.status(201).send({ data: updateCategory.data });
    },
  });

  // DELETE /admin/:id
  app.route({
    method: 'DELETE',
    url: '/admin/category/:id',
    schema: {
      tags: ['Admin'],
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
    preHandler: [authMiddleware, adminMiddleware],
    handler: async (req, res) => {
      const { id } = req.params;

      const resultGet = await GetCategoryController(id);
      if (resultGet.error) {
        res.status(500).send({ error: resultGet.error });
        return;
      }

      if (!resultGet.data?.id) {
        res.status(404).send({ error: 'A categoria não foi encontrada' });
        return;
      }

      const deleteGet = await DeleteCategoryController(id);
      if (deleteGet.error) {
        res.status(500).send({ error: deleteGet.error });
        return;
      }

      res.status(201).send();
    },
  });
};

export default routes;

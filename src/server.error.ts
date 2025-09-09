import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { isResponseSerializationError } from 'fastify-type-provider-zod';

import { fastify } from './server.config';

fastify.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: true,
      message: "Request doesn't match the schema",
      statusCode: 400,
      details: {
        issues: err.validation,
        method: req.method,
        url: req.url,
      },
    });
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: true,
      message: "Response doesn't match the schema",
      statusCode: 500,
      details: {
        issues: err.cause.issues,
        method: err.method,
        url: err.url,
      },
    });
  }

  return reply.code(500).send({
    error: true,
    message: "Response doesn't match the schema",
    statusCode: 500,
  });
});

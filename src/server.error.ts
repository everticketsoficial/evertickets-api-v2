import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { isResponseSerializationError } from 'fastify-type-provider-zod';

import { fastify } from './server.config';

fastify.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: {
        name: err?.name ?? 'Ocorreu um erro desconhecido',
        message: err.message ?? "Request doesn't match the schema",
      },
    });
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: {
        name: err.message,
        message: err.cause.issues.length > 0 ? err.cause.issues[0].message : '',
      },
    });
  }

  return reply.code(500).send({
    error: {
      name: err?.name ?? 'Ocorreu um erro desconhecido',
      message: "Response doesn't match the schema",
    },
  });
});

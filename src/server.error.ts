import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { isResponseSerializationError } from 'fastify-type-provider-zod';

import { fastify } from './server.config';

fastify.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: err?.message ?? "Request doesn't match the schema",
    });
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: err.cause.issues.length > 0 ? err.cause.issues[0].message : err.message,
    });
  }

  return reply.code(500).send({
    error: err?.message ?? "Response doesn't match the schema",
  });
});

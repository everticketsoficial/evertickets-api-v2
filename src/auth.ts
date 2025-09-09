import { FastifyReply, FastifyRequest } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ error: true, message: 'Token não informado' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const { data, error } = await request.server.supabase.auth.getUser(token);

    if (error || !data.user) {
      return reply.status(401).send({ error: true, message: 'Token inválido' });
    }

    request.user = data.user;
  } catch (err) {
    return reply.status(401).send({ error: true, message: 'Falha na autenticação' });
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: any;
  }
}

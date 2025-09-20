import { FastifyReply, FastifyRequest } from 'fastify';

import { supabase } from './plugins/supabase';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('Token não informado');
    }

    const token = authHeader.replace('Bearer ', '');

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      throw new Error('Token inválido');
    }

    request.user = {
      id: data.user.id,
      email: data.user.email ?? '',
    };
  } catch (error: any) {
    reply.status(401).send({
      error: {
        name: 'Autenticação',
        message: error?.message ?? 'Falha na autenticação',
      },
    });
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
    };
  }
}

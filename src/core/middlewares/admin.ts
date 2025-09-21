import { FastifyReply, FastifyRequest } from 'fastify';

const adminMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (request.currentUser.profile_level != 'admin') {
      throw new Error('Rota não encontrada');
    }
  } catch (error: any) {
    reply.status(401).send({
      error: error?.message ?? 'Rota não encontrada',
    });
  }
};

export { adminMiddleware };

import { FastifyReply, FastifyRequest } from 'fastify';

const producerMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (['producer', 'admin'].includes(request.currentUser.profile_level)) {
      throw new Error('Rota não encontrada');
    }
  } catch (error: any) {
    reply.status(401).send({
      error: error?.message ?? 'Rota não encontrada',
    });
  }
};

export { producerMiddleware };

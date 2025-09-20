import { FastifyReply, FastifyRequest } from 'fastify';

import { supabase } from './plugins/supabase';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('Token não informado');
    }

    const token = authHeader.replace('Bearer ', '');

    const userResult = await supabase.auth.getUser(token);
    if (userResult.error || !userResult.data.user) {
      throw new Error('Token inválido');
    }

    const profileResult = await supabase.from('profiles').select('*').eq('id', userResult.data.user.id).maybeSingle();
    if (profileResult.error || !profileResult.data?.id) {
      throw new Error('Perfil não encontrado');
    }

    if (profileResult.data?.blocked) {
      throw new Error('Usuário bloqueado');
    }

    request.currentUser = {
      id: userResult.data.user.id,
      email: userResult.data.user.email ?? '',
      display_name: profileResult.data.display_name,
      profile_level: profileResult.data.profile_level,
      profile_type: profileResult.data.profile_type,
      cpf: profileResult.data.cpf,
      cnpj: profileResult.data.cnpj,
      avatar_url: profileResult.data.avatar_url,
      blocked: profileResult.data.blocked,
      phone: profileResult.data.phone,
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

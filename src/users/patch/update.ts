import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { User } from '@prisma/client';

interface Body {
  id: number;
  email?: string;
  name?: string;
  password?: string;
}

export const handler = async (
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply
) => {
  const { id, email, name, password } = request.body;
  const prisma = request.server.prisma;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name, password },
    });

    return reply.status(200).send({
      message: 'User updated successfully.',
      status: true,
      data: updatedUser,
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Failed to update user',
      status: false,
      error,
    });
  }
};

export const options: Omit<RouteOptions, 'handler' | 'url' | 'method'> & {
  private: boolean;
} = {
  private: true,
  schema: {
    body: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' },
          data: { type: 'object' },
        },
      },
      500: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' },
          error: { type: 'object' },
        },
      },
    },
  },
};

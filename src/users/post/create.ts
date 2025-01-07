import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { User } from '@prisma/client';

interface Body {
  email: string;
  name?: string;
  password?: string;
}

export const handler = async (
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply
) => {
  const { email, name, password } = request.body;
  const prisma = request.server.prisma;

  try {
    const newUser: User = await prisma.user.create({
      data: { email, name, password },
    });

    return reply.status(201).send({
      message: 'User created successfully.',
      status: true,
      data: newUser,
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Failed to create user',
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
      required: ['email'],
      properties: {
        email: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
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

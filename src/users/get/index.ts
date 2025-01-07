import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { User } from '@prisma/client';

interface Query {
  query?: string;
}

export const handler = async (
  request: FastifyRequest<{ Querystring: Query }>,
  reply: FastifyReply
) => {
  const { query } = request.query;
  const prisma = request.server.prisma;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query || '', mode: 'insensitive' } },
          { email: { contains: query || '', mode: 'insensitive' } },
        ],
      },
    });

    return reply.status(200).send({
      message: 'Fetched user records.',
      status: true,
      data: users,
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Failed to fetch users',
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
    querystring: {
      type: 'object',
      properties: {
        query: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' },
          data: { type: 'array', items: { type: 'object' } },
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

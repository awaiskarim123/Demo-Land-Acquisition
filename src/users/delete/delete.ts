import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

interface Params {
  id: number;
}

export const handler = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const prisma = request.server.prisma;

  try {
    await prisma.user.delete({
      where: { id },
    });

    return reply.status(200).send({
      message: 'User deleted successfully.',
      status: true,
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Failed to delete user',
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
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' },
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

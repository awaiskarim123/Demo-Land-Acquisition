import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export const handler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  try {
    const { id } = request.params;
    await prisma.landParcel.delete({ where: { id: parseInt(id) } });

    reply.status(200).send({ message: 'Land parcel deleted successfully',});
  } catch (error) {
    reply.status(500).send({ message: 'Failed to delete land parcel',});
  }
};

export const options: Omit<RouteOptions, 'handler' | 'url' | 'method'> = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            status: { type: 'boolean' },
            data: { type: 'array', items: { type: 'object' } }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            status: { type: 'boolean' }
          }
        }
      }
    }
  };
  

import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export const handler = async (
  request: FastifyRequest<{ Querystring: { id?: string } }>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  try {
    const { id } = request.query;
    const landParcels = id
      ? await prisma.landParcel.findUnique({ where: { id: parseInt(id) } })
      : await prisma.landParcel.findMany();

    if (!landParcels) {
      return reply.status(404).send({ message: 'Land parcel not found',});
    }

    reply.status(200).send({ message: 'Land parcels fetched successfully',});
  } catch (error) {
    reply.status(500).send({ message: 'Failed to fetch land parcels',});
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

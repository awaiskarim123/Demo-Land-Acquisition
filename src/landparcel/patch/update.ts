import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export const handler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; location?: string } }>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  try {
    const { id } = request.params;
    const { name, location } = request.body;
    const updatedLandParcel = await prisma.landParcel.update({
      where: { id: parseInt(id) },
      data: { name, location }
    });

    reply.status(200).send({ message: 'Land parcel updated successfully',});
  } catch (error) {
    reply.status(500).send({ message: 'Failed to update land parcel',});
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
  
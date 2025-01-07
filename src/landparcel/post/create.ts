import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

export const handler = async (
  request: FastifyRequest<{ Body: { name: string; location: string; ownerName?: string; area?: number } }>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  try {
    const { name, location, ownerName, area } = request.body;
    const newLandParcel = await prisma.landParcel.create({
      data: { 
        name, 
        location, 
        ownerName: ownerName ?? '', 
        area: area ?? 0 
      }
    });

    // Send the newLandParcel object in the response
    reply.status(201).send({
      message: 'Land parcel created successfully',
      status: true,
      data: newLandParcel
    });
  } catch (error) {
    reply.status(500).send({ 
      message: 'Failed to create land parcel', 
      status: false 
    });
  }
};

export const options: Omit<RouteOptions, 'handler' | 'url' | 'method'> = {
  schema: {
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' },
          data: { 
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              ownerName: { type: 'string' },
              area: { type: 'number' },
              location: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      },
      500: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'boolean' }
        }
      }
    }
  }
};

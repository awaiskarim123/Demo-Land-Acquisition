import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const prismaPlugin = async (fastify: FastifyInstance) => {
  fastify.decorate('prisma', prisma);

  // Correct signature for Fastify 5.x
  fastify.addHook('onClose', async (instance: FastifyInstance) => {
    await instance.prisma.$disconnect();
  });
};

export default fp(prismaPlugin, {
  fastify: '5.x', 
  name: 'fastify-prisma-plugin',
});

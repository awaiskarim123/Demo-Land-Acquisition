import Fastify from 'fastify';
import path from 'path';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import prismaPlugin from './plugins/prismaPlugin';
import fastifyMultipart from '@fastify/multipart';

const fastify = Fastify({ logger: true });

// Register core plugins
fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'default_secret',
  parseOptions: {},
});

fastify.register(rateLimit, {
  max: 300,
  timeWindow: '1 minute',
});

fastify.register(cors, {
  origin: true,
  credentials: true,
});

fastify.register(fastifyMultipart);
fastify.register(prismaPlugin);

// // Registering all routes and plugins dynamically using AutoLoad
// fastify.register(AutoLoad, {
//   dir: path.join(__dirname, '/'), // Path to routes directory
//   options: { prefix: '/api' },
// });

// Function to start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Start the server
start();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = __importDefault(require("./prisma"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.get('/', async (request, reply) => {
    return { message: 'Hello, Fastify with TypeScript and Prisma!' };
});
fastify.post('/users', async (request, reply) => {
    const { email, name } = request.body;
    const user = await prisma_1.default.user.create({
        data: {
            email,
            name,
        },
    });
    return user;
});
fastify.get('/users', async (request, reply) => {
    const users = await prisma_1.default.user.findMany();
    return users;
});
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server is running on http://localhost:3000');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const path_1 = __importDefault(require("path"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const cors_1 = __importDefault(require("@fastify/cors"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const prismaPlugin_1 = __importDefault(require("./plugins/prismaPlugin"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const fastify = (0, fastify_1.default)({ logger: true });
// Register core plugins
fastify.register(cookie_1.default, {
    secret: process.env.COOKIE_SECRET || 'default_secret',
    parseOptions: {},
});
fastify.register(rate_limit_1.default, {
    max: 300,
    timeWindow: '1 minute',
});
fastify.register(cors_1.default, {
    origin: true,
    credentials: true,
});
fastify.register(multipart_1.default);
fastify.register(prismaPlugin_1.default);
// Registering all routes and plugins dynamically using AutoLoad
fastify.register(autoload_1.default, {
    dir: path_1.default.join(__dirname, 'src'), // Path to routes directory
    options: { prefix: '/api' },
});
// Function to start the server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: 3000 });
        console.log('Server is running on http://localhost:3000');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
// Start the server
start();

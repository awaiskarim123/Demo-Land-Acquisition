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
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.handler = void 0;
const handler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, name, password } = request.body;
    const prisma = request.server.prisma;
    try {
        const updatedUser = yield prisma.user.update({
            where: { id },
            data: { email, name, password },
        });
        return reply.status(200).send({
            message: 'User updated successfully.',
            status: true,
            data: updatedUser,
        });
    }
    catch (error) {
        return reply.status(500).send({
            message: 'Failed to update user',
            status: false,
            error,
        });
    }
});
exports.handler = handler;
exports.options = {
    private: true,
    schema: {
        body: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                name: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    status: { type: 'boolean' },
                    data: { type: 'object' },
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

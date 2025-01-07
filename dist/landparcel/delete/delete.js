"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.handler = void 0;
const handler = async (request, reply) => {
    const prisma = request.server.prisma;
    try {
        const { id } = request.params;
        await prisma.landParcel.delete({ where: { id: parseInt(id) } });
        reply.status(200).send({ message: 'Land parcel deleted successfully', });
    }
    catch (error) {
        reply.status(500).send({ message: 'Failed to delete land parcel', });
    }
};
exports.handler = handler;
exports.options = {
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

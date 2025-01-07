"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.handler = void 0;
const handler = async (request, reply) => {
    const prisma = request.server.prisma;
    try {
        const { id } = request.params;
        const { name, location } = request.body;
        const updatedLandParcel = await prisma.landParcel.update({
            where: { id: parseInt(id) },
            data: { name, location }
        });
        reply.status(200).send({ message: 'Land parcel updated successfully', });
    }
    catch (error) {
        reply.status(500).send({ message: 'Failed to update land parcel', });
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

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
    const prisma = request.server.prisma;
    try {
        const { id } = request.query;
        const landParcels = id
            ? yield prisma.landParcel.findUnique({ where: { id: parseInt(id) } })
            : yield prisma.landParcel.findMany();
        if (!landParcels) {
            return reply.status(404).send({ message: 'Land parcel not found', });
        }
        reply.status(200).send({ message: 'Land parcels fetched successfully', });
    }
    catch (error) {
        reply.status(500).send({ message: 'Failed to fetch land parcels', });
    }
});
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

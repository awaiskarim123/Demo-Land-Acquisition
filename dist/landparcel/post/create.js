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
        const { name, location, ownerName, area } = request.body;
        const newLandParcel = yield prisma.landParcel.create({
            data: {
                name,
                location,
                ownerName: ownerName !== null && ownerName !== void 0 ? ownerName : '',
                area: area !== null && area !== void 0 ? area : 0
            }
        });
        // Send the newLandParcel object in the response
        reply.status(201).send({
            message: 'Land parcel created successfully',
            status: true,
            data: newLandParcel
        });
    }
    catch (error) {
        reply.status(500).send({
            message: 'Failed to create land parcel',
            status: false
        });
    }
});
exports.handler = handler;
exports.options = {
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

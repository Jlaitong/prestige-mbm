"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
let PrismaService = PrismaService_1 = class PrismaService {
    constructor() {
        this.logger = new common_1.Logger(PrismaService_1.name);
        this.isConnected = false;
        this.client = null;
    }
    async onModuleInit() {
        try {
            const prismaModule = await Promise.resolve().then(() => require('@prisma/client')).catch(() => null);
            if (prismaModule && prismaModule.PrismaClient) {
                this.client = new prismaModule.PrismaClient();
                await this.client.$connect();
                this.isConnected = true;
                this.logger.log('Conectado a PostgreSQL exitosamente.');
            }
            else {
                this.isConnected = false;
                this.logger.log('Iniciando en modo catálogo autónomo con datos oficiales de Bogotá.');
            }
        }
        catch (error) {
            this.isConnected = false;
            this.logger.warn('PostgreSQL no detectado en DATABASE_URL. Operando en modo memoria con seed oficial.');
        }
    }
    async onModuleDestroy() {
        if (this.client && this.isConnected) {
            try {
                await this.client.$disconnect();
            }
            catch (err) {
            }
        }
    }
    get product() {
        return this.client?.product;
    }
    get category() {
        return this.client?.category;
    }
    get order() {
        return this.client?.order;
    }
    get customer() {
        return this.client?.customer;
    }
    get atelierLook() {
        return this.client?.atelierLook;
    }
    get user() {
        return this.client?.user;
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map
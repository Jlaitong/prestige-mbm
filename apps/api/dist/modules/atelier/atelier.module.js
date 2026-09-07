"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelierModule = void 0;
const common_1 = require("@nestjs/common");
const atelier_controller_1 = require("./atelier.controller");
const atelier_service_1 = require("./atelier.service");
const prisma_service_1 = require("../../database/prisma.service");
let AtelierModule = class AtelierModule {
};
exports.AtelierModule = AtelierModule;
exports.AtelierModule = AtelierModule = __decorate([
    (0, common_1.Module)({
        controllers: [atelier_controller_1.AtelierController],
        providers: [atelier_service_1.AtelierService, prisma_service_1.PrismaService],
        exports: [atelier_service_1.AtelierService],
    })
], AtelierModule);
//# sourceMappingURL=atelier.module.js.map
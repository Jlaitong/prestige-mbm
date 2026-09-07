"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelierService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const seed_data_1 = require("../../common/seed-data");
let AtelierService = class AtelierService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        if (this.prisma.isConnected) {
            try {
                const looks = await this.prisma.atelierLook.findMany({
                    include: { items: true },
                });
                if (looks && looks.length > 0)
                    return looks;
            }
            catch (err) {
            }
        }
        return seed_data_1.INITIAL_ATELIER_LOOKS.map((look, i) => ({
            id: `look-${i + 1}`,
            key: look.key,
            title: look.title,
            subtitle: look.subtitle,
            description: look.description,
            price: look.price,
            compareAtPrice: look.compareAtPrice,
            isPopular: look.isPopular,
            includedItems: look.items,
        }));
    }
    async findByKey(key) {
        const looks = await this.findAll();
        return looks.find((l) => l.key === key) || null;
    }
};
exports.AtelierService = AtelierService;
exports.AtelierService = AtelierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AtelierService);
//# sourceMappingURL=atelier.service.js.map
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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const seed_data_1 = require("../../common/seed-data");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(categorySlug) {
        if (this.prisma.isConnected) {
            try {
                const where = categorySlug && categorySlug !== 'all' ? { categorySlug } : {};
                const dbProducts = await this.prisma.product.findMany({
                    where,
                    include: { images: true, variants: true },
                    orderBy: { createdAt: 'desc' },
                });
                if (dbProducts && dbProducts.length > 0)
                    return dbProducts;
            }
            catch (err) {
            }
        }
        let products = seed_data_1.INITIAL_PRODUCTS.map((p, i) => ({
            id: `prod-${i + 1}`,
            slug: p.slug,
            name: p.name,
            description: p.description,
            details: p.details,
            densityGsm: p.densityGsm,
            price: p.price,
            compareAtPrice: p.compareAtPrice,
            badge: p.badge,
            categorySlug: p.categorySlug,
            images: [
                {
                    id: `img-${i + 1}`,
                    url: p.imageUrl,
                    altText: p.name,
                    isPrimary: true,
                    order: 0,
                },
            ],
            variants: p.sizes.map((sz, vIdx) => ({
                id: `var-${i + 1}-${vIdx + 1}`,
                productId: `prod-${i + 1}`,
                size: sz,
                color: 'Negro / Obsidian',
                sku: `PBM-${p.slug.toUpperCase().slice(0, 4)}-${sz}`,
                stock: 12,
            })),
            isAvailable: p.isAvailable,
            isFeatured: p.isFeatured,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        if (categorySlug && categorySlug !== 'all') {
            products = products.filter((p) => p.categorySlug === categorySlug);
        }
        return products;
    }
    async findBySlug(slug) {
        const products = await this.findAll();
        return products.find((p) => p.slug === slug) || null;
    }
    async findById(id) {
        const products = await this.findAll();
        return products.find((p) => p.id === id) || null;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map
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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const products_service_1 = require("../products/products.service");
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(prisma, productsService) {
        this.prisma = prisma;
        this.productsService = productsService;
        this.logger = new common_1.Logger(OrdersService_1.name);
        this.orderCounter = 1;
    }
    generateOrderNumber() {
        const year = new Date().getFullYear();
        const sequence = String(this.orderCounter++).padStart(6, '0');
        return `PBM-${year}-${sequence}`;
    }
    async createOrder(dto) {
        if (!dto.items || dto.items.length === 0) {
            throw new common_1.BadRequestException('El pedido debe incluir al menos una prenda.');
        }
        const calculatedItems = [];
        let total = 0;
        for (const item of dto.items) {
            const product = await this.productsService.findById(item.productId);
            if (!product) {
                throw new common_1.BadRequestException(`El producto con ID '${item.productId}' no existe en el catálogo.`);
            }
            if (!product.isAvailable) {
                throw new common_1.BadRequestException(`La prenda '${product.name}' se encuentra agotada.`);
            }
            let selectedVariant = product.variants?.find((v) => v.id === item.variantId);
            if (!selectedVariant && product.variants && product.variants.length > 0) {
                selectedVariant = product.variants[0];
            }
            if (selectedVariant && selectedVariant.stock < item.quantity) {
                throw new common_1.BadRequestException(`Stock insuficiente para '${product.name}' talla ${selectedVariant.size}. Disponibles: ${selectedVariant.stock}`);
            }
            const itemSubtotal = product.price * item.quantity;
            total += itemSubtotal;
            calculatedItems.push({
                productName: product.name,
                variantSize: selectedVariant?.size || 'Única',
                quantity: item.quantity,
                unitPrice: product.price,
                subtotal: itemSubtotal,
            });
        }
        const orderNumber = this.generateOrderNumber();
        const whatsappPhone = process.env.WHATSAPP_NUMBER || '573332874590';
        const itemsLines = calculatedItems
            .map((it, idx) => `${idx + 1}. *${it.productName}* [Talla ${it.variantSize}] x${it.quantity} — $${it.subtotal.toLocaleString('es-CO')} COP`)
            .join('%0A');
        const whatsappText = `*NUEVO PEDIDO OFICIAL — PRESTIGE MBM*%0A` +
            `*Orden:* ${orderNumber}%0A` +
            `*Cliente:* ${dto.customer.fullName}%0A` +
            `*Teléfono:* ${dto.customer.phone}%0A` +
            `*Ciudad:* ${dto.customer.city}%0A` +
            `${dto.customer.address ? `*Dirección:* ${dto.customer.address}%0A` : ''}` +
            `--------------------------------%0A` +
            `${itemsLines}%0A` +
            `--------------------------------%0A` +
            `*TOTAL:* $${total.toLocaleString('es-CO')} COP%0A` +
            `*Despacho:* 24H Bogotá / Envíos Nacionales%0A` +
            `${dto.notes ? `*Notas:* ${dto.notes}%0A` : ''}%0A` +
            `Quedo atento a la confirmación de pago para empaque y despacho.`;
        const whatsAppUrl = `https://wa.me/${whatsappPhone}?text=${whatsappText}`;
        let orderId = `ord-${Date.now()}`;
        if (this.prisma.isConnected) {
            try {
                const customerRecord = await this.prisma.customer.upsert({
                    where: { phone: dto.customer.phone },
                    update: {
                        fullName: dto.customer.fullName,
                        city: dto.customer.city,
                        address: dto.customer.address,
                    },
                    create: {
                        fullName: dto.customer.fullName,
                        phone: dto.customer.phone,
                        email: dto.customer.email,
                        city: dto.customer.city,
                        address: dto.customer.address,
                    },
                });
                const createdOrder = await this.prisma.order.create({
                    data: {
                        orderNumber,
                        customerId: customerRecord.id,
                        subtotal: total,
                        total,
                        notes: dto.notes,
                        status: 'PENDING',
                        items: {
                            create: dto.items.map((it, idx) => ({
                                productId: it.productId,
                                variantId: it.variantId,
                                quantity: it.quantity,
                                unitPrice: calculatedItems[idx].unitPrice,
                                subtotal: calculatedItems[idx].subtotal,
                            })),
                        },
                    },
                });
                orderId = createdOrder.id;
            }
            catch (err) {
                this.logger.error('Error saving order to DB, returning order payload directly:', err);
            }
        }
        return {
            id: orderId,
            orderNumber,
            status: 'PENDING',
            subtotal: total,
            total,
            customer: dto.customer,
            items: calculatedItems,
            whatsAppUrl,
            createdAt: new Date().toISOString(),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
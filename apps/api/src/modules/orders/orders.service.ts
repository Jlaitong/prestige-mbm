import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponse } from '@prestige/types';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private orderCounter = 1;

  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
  ) {}

  private generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const sequence = String(this.orderCounter++).padStart(6, '0');
    return `PBM-${year}-${sequence}`;
  }

  async createOrder(dto: CreateOrderDto): Promise<OrderResponse> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('El pedido debe incluir al menos una prenda.');
    }

    const calculatedItems: {
      productName: string;
      variantSize?: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }[] = [];

    let total = 0;

    // Validación rigurosa de cada prenda en la base de datos oficial
    for (const item of dto.items) {
      const product = await this.productsService.findById(item.productId);
      if (!product) {
        throw new BadRequestException(`El producto con ID '${item.productId}' no existe en el catálogo.`);
      }

      if (!product.isAvailable) {
        throw new BadRequestException(`La prenda '${product.name}' se encuentra agotada.`);
      }

      let selectedVariant = product.variants?.find((v) => v.id === item.variantId);
      if (!selectedVariant && product.variants && product.variants.length > 0) {
        selectedVariant = product.variants[0];
      }

      if (selectedVariant && selectedVariant.stock < item.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para '${product.name}' talla ${selectedVariant.size}. Disponibles: ${selectedVariant.stock}`,
        );
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

    // Construcción de mensaje oficial de WhatsApp estructurado
    const itemsLines = calculatedItems
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.productName}* [Talla ${it.variantSize}] x${it.quantity} — $${it.subtotal.toLocaleString('es-CO')} COP`,
      )
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

    // Si PostgreSQL está activo, persistir la orden en base de datos
    let orderId = `ord-${Date.now()}`;
    if (this.prisma.isConnected) {
      try {
        const customerRecord = await (this.prisma as any).customer.upsert({
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

        const createdOrder = await (this.prisma as any).order.create({
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
      } catch (err) {
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
}

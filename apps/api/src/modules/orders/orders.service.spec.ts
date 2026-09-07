import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../../database/prisma.service';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let productsService: ProductsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    productsService = new ProductsService(prismaService);
    ordersService = new OrdersService(prismaService, productsService);
  });

  it('should create an order with sequential PBM-2026 format and correct totals', async () => {
    const products = await productsService.findAll();
    const firstProduct = products[0];

    const order = await ordersService.createOrder({
      customer: {
        fullName: 'Cliente VIP Bogotá',
        phone: '573001234567',
        city: 'Bogotá D.C.',
        address: 'Zona Rosa Calle 85',
      },
      items: [
        {
          productId: firstProduct.id,
          quantity: 2,
        },
      ],
    });

    expect(order.orderNumber).toMatch(/^PBM-\d{4}-\d{6}$/);
    expect(order.total).toBe(firstProduct.price * 2);
    expect(order.items.length).toBe(1);
    expect(order.whatsAppUrl).toContain('wa.me');
  });
});

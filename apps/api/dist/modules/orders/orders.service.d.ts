import { PrismaService } from '../../database/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponse } from '@prestige/types';
export declare class OrdersService {
    private readonly prisma;
    private readonly productsService;
    private readonly logger;
    private orderCounter;
    constructor(prisma: PrismaService, productsService: ProductsService);
    private generateOrderNumber;
    createOrder(dto: CreateOrderDto): Promise<OrderResponse>;
}

import { PrismaService } from '../../database/prisma.service';
import { Product } from '@prestige/types';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(categorySlug?: string): Promise<Product[]>;
    findBySlug(slug: string): Promise<Product | null>;
    findById(id: string): Promise<Product | null>;
}

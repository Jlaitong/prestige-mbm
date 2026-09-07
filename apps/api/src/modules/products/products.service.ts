import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { INITIAL_PRODUCTS } from '../../common/seed-data';
import { Product } from '@prestige/types';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(categorySlug?: string): Promise<Product[]> {
    if (this.prisma.isConnected) {
      try {
        const where = categorySlug && categorySlug !== 'all' ? { categorySlug } : {};
        const dbProducts = await (this.prisma as any).product.findMany({
          where,
          include: { images: true, variants: true },
          orderBy: { createdAt: 'desc' },
        });
        if (dbProducts && dbProducts.length > 0) return dbProducts as Product[];
      } catch (err) {
        // fallback
      }
    }

    let products = INITIAL_PRODUCTS.map((p, i) => ({
      id: `prod-${i + 1}`,
      slug: p.slug,
      name: p.name,
      description: p.description,
      details: p.details,
      densityGsm: p.densityGsm,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      badge: p.badge,
      categorySlug: p.categorySlug as any,
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

  async findBySlug(slug: string): Promise<Product | null> {
    const products = await this.findAll();
    return products.find((p) => p.slug === slug) || null;
  }

  async findById(id: string): Promise<Product | null> {
    const products = await this.findAll();
    return products.find((p) => p.id === id) || null;
  }
}

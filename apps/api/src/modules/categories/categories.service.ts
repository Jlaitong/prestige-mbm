import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { INITIAL_CATEGORIES } from '../../common/seed-data';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    if (this.prisma.isConnected) {
      try {
        const categories = await (this.prisma as any).category.findMany({
          orderBy: { name: 'asc' },
        });
        if (categories.length > 0) return categories;
      } catch (err) {
        // fallback
      }
    }
    return INITIAL_CATEGORIES.map((cat, i) => ({
      id: `cat-${i + 1}`,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  async findBySlug(slug: string) {
    const categories = await this.findAll();
    return categories.find((c: any) => c.slug === slug);
  }
}

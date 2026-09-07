import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { INITIAL_ATELIER_LOOKS } from '../../common/seed-data';
import { AtelierLook } from '@prestige/types';

@Injectable()
export class AtelierService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AtelierLook[]> {
    if (this.prisma.isConnected) {
      try {
        const looks = await (this.prisma as any).atelierLook.findMany({
          include: { items: true },
        });
        if (looks && looks.length > 0) return looks as AtelierLook[];
      } catch (err) {
        // fallback
      }
    }

    return INITIAL_ATELIER_LOOKS.map((look, i) => ({
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

  async findByKey(key: string): Promise<AtelierLook | null> {
    const looks = await this.findAll();
    return looks.find((l) => l.key === key) || null;
  }
}

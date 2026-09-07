import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;
  private client: any = null;

  async onModuleInit() {
    try {
      // Dynamic resolution for Prisma Client
      const prismaModule = await import('@prisma/client').catch(() => null);
      if (prismaModule && prismaModule.PrismaClient) {
        this.client = new prismaModule.PrismaClient();
        await this.client.$connect();
        this.isConnected = true;
        this.logger.log('Conectado a PostgreSQL exitosamente.');
      } else {
        this.isConnected = false;
        this.logger.log('Iniciando en modo catálogo autónomo con datos oficiales de Bogotá.');
      }
    } catch (error) {
      this.isConnected = false;
      this.logger.warn('PostgreSQL no detectado en DATABASE_URL. Operando en modo memoria con seed oficial.');
    }
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      try {
        await this.client.$disconnect();
      } catch (err) {
        // ignore
      }
    }
  }

  get product() {
    return this.client?.product;
  }

  get category() {
    return this.client?.category;
  }

  get order() {
    return this.client?.order;
  }

  get customer() {
    return this.client?.customer;
  }

  get atelierLook() {
    return this.client?.atelierLook;
  }

  get user() {
    return this.client?.user;
  }
}

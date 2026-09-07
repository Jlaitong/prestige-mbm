import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  checkHealth() {
    return {
      status: 'ok',
      brand: 'PRESTIGE MBM — Bogotá D.C.',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      database: this.prisma.isConnected ? 'connected' : 'fallback-ready',
      version: '1.0.0'
    };
  }
}

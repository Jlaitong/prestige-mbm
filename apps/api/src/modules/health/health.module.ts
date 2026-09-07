import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
  exports: [HealthController],
})
export class HealthModule {}

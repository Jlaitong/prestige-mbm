import { Module } from '@nestjs/common';
import { AtelierController } from './atelier.controller';
import { AtelierService } from './atelier.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [AtelierController],
  providers: [AtelierService, PrismaService],
  exports: [AtelierService],
})
export class AtelierModule {}

import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AtelierService } from './atelier.service';

@Controller('atelier')
export class AtelierController {
  constructor(private readonly atelierService: AtelierService) {}

  @Get()
  async getAll() {
    return this.atelierService.findAll();
  }

  @Get(':key')
  async getOne(@Param('key') key: string) {
    const look = await this.atelierService.findByKey(key);
    if (!look) {
      throw new NotFoundException(`Look de Atelier '${key}' no encontrado.`);
    }
    return look;
  }
}

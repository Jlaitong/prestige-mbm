import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query('category') category?: string) {
    return this.productsService.findAll(category);
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug);
    if (!product) {
      throw new NotFoundException(`Prenda '${slug}' no encontrada en el catálogo.`);
    }
    return product;
  }
}

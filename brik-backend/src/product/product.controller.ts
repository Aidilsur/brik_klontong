import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.productService.findAll(page, limit, search);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() product: Product) {
    await this.productService.create(product);
    return { message: 'Product created successfully' };
  }
}

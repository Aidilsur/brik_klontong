import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

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

  @Post()
  async create(@Body() dto: CreateProductDto) {
    await this.productService.create(dto);
    return { message: 'Product created successfully' };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}

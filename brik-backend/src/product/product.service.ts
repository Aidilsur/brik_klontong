import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async findAll(page = 1, limit = 10, search?: string) {
    const [data, total] = await this.productRepo.findAndCount({
      where: search
        ? { name: Raw((alias) => `${alias} ILIKE '%${search}%'`) }
        : {},
      take: limit,
      skip: (page - 1) * limit,
    });
    return { data, total };
  }

  async create(product: Partial<Product>) {
    const newProduct = this.productRepo.create(product);
    return this.productRepo.save(newProduct);
  }

  async findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  async update(id: number, dto: CreateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepo.update(id, dto);
    return { message: 'Product updated successfully' };
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepo.remove(product);
    return { message: 'Product deleted successfully' };
  }
}

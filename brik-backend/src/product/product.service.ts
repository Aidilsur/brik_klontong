import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async findAll(page = 1, limit = 10, search?: string) {
    const [data, total] = await this.productRepo.findAndCount({
      where: search ? { name: Like(`%${search}%`) } : {},
      take: limit,
      skip: (page - 1) * limit,
    });
    return { data, total, page, limit };
  }

  async findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  async create(product: Partial<Product>) {
    const newProduct = this.productRepo.create(product);
    return this.productRepo.save(newProduct);
  }
}

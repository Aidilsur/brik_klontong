import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seedProducts() {
    const filePath = path.join(__dirname, '../dummy/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const products: CreateProductDto[] = JSON.parse(data);

    await this.productRepository.clear();

    await this.productRepository.save(products);
  }
}

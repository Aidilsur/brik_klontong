import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getConnection } from 'typeorm';
import * as fs from 'fs';
import { Product } from '../product/product.entity';

interface ProductSeed {
  CategoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const data: ProductSeed[] = JSON.parse(
    fs.readFileSync('../dummy/products.json', 'utf8'),
  );

  const connection = getConnection();
  const productRepository = connection.getRepository(Product);

  for (const item of data) {
    await productRepository.save(item);
  }

  console.log('Seeding products selesai');
  await app.close();
}

bootstrap();

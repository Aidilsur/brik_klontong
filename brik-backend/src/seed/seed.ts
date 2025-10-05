import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedService = app
    .select(SeedModule)
    .get(SeedService, { strict: false });
  await seedService.seedProducts();

  await app.close();
}
bootstrap();

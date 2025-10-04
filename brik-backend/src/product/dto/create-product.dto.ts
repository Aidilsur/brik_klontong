import { IsNotEmpty, IsString, IsNumber, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  CategoryId: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  length: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}

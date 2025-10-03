import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CategoryId: number;

  @Column()
  categoryName: string;

  @Column({ length: 50 })
  sku: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  weight: number;

  @Column('int')
  width: number;

  @Column('int')
  length: number;

  @Column('int')
  height: number;

  @Column('varchar', { length: 255 })
  image: string;

  @Column('int')
  price: number;
}

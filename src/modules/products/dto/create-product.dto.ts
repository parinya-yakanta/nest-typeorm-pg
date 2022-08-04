import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

@Exclude()
export class CreateProductDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsArray()
  categorys: [];

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  image?: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;

  deletedAt?: Date;

  updatedAt: Date;

  createdAt: Date;

  // constructor(partial: Partial<CreateProductDto>) {
  //   Object.assign(this, partial);
  // }
}

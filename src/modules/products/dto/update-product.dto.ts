import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

@Exclude()
export class UpdateProductDto extends PartialType(CreateProductDto) {}

import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateCategoryDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  status: number;

  deletedAt?: Date;

  updatedAt: Date;

  createdAt: Date;
}

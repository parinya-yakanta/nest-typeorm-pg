import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class CreateShopDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  image: string;

  @Expose()
  @IsString()
  shopType: string;

  @Expose()
  @IsString()
  @IsOptional()
  location: string;

  @Expose()
  @IsString()
  @IsOptional()
  address: string;

  @Expose()
  @IsString()
  @IsOptional()
  phone: string;

  @Expose()
  @IsString()
  shopKeeper: string;

  @Expose()
  @IsOptional()
  status: number;

  deletedAt?: Date;

  updatedAt: Date;

  createdAt: Date;
}

import { CreateGalleryDto } from './create-gallery.dto';
import { IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateMultiGalleryDto {
  @Expose()
  @IsNumber()
  productId: number;

  @Expose()
  @IsArray()
  gallerys: CreateGalleryDto[];

  deletedAt?: Date;

  updatedAt: Date;

  createdAt: Date;
}

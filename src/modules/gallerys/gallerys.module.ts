import { ProductRepository } from '../products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryRepository } from './gallerys.repository';
import { Module } from '@nestjs/common';
import { GallerysService } from './gallerys.service';
import { GallerysController } from './gallerys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryRepository, ProductRepository])],
  controllers: [GallerysController],
  providers: [GallerysService],
})
export class GallerysModule {}

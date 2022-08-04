import { CategoryRepository } from '../categorys/categorys.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, CategoryRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

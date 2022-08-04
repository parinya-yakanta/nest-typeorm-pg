import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './categorys.repository';
import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}

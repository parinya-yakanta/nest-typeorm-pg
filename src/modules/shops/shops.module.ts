import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsRepository } from './shops.repository';
import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShopsRepository])],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}

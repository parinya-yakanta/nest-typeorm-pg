import { User } from '../users/entities/user.entity';
import { ShopsRepository } from './shops.repository';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopsRepository)
    private readonly shopsRepository: ShopsRepository,
  ) {}

  async create(createShopDto: CreateShopDto, user: User): Promise<Shop> {
    try {
      const shop = this.shopsRepository.create(createShopDto);
      const time = new Date().getTime();
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const code = `SHOP${year}${month}${date}${time}`;
      Object.assign(shop, { user: user, code: code });
      return await this.shopsRepository.save(shop);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Shop Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Shop[]> {
    const shops = await this.shopsRepository.find({
      relations: ['user', 'products'],
      order: {
        id: 'DESC',
      },
      // loadRelationIds: true,
    });

    if (!shops) {
      throw new HttpException(
        {
          message: 'Is Shops Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return shops;
  }

  async findOne(id: number): Promise<Shop> {
    const shops = await this.shopsRepository.findOne(id, {
      relations: ['user', 'products'],
      order: {
        id: 'DESC',
      },
      // loadRelationIds: true,
    });

    if (!shops) {
      throw new HttpException(
        {
          message: 'Is Shops Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return shops;
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    try {
      const shop = await this.findOne(id);

      if (!shop) {
        throw new HttpException(
          {
            message: 'Is Product Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.shopsRepository.update(id, updateShopDto);

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Update Shop Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const shop = await this.findOne(id);

      if (!shop) {
        throw new HttpException(
          {
            message: 'Is Product Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.shopsRepository.delete(id);

      return `DELETE SHOP ID: ${id} SUCCESS`;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

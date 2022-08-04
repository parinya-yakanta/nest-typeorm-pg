import { CategoryRepository } from '../categorys/categorys.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { categorys } = createProductDto;
      const category = await this.categoryRepository.findByIds(categorys);
      const product = this.productRepository.create(createProductDto);
      product.categorys = category;
      const time = new Date().getTime();
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const code = `PROD${year}${month}${date}${time}`;
      Object.assign(product, { code: code });

      return await this.productRepository.save(product);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Product Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products) {
      throw new HttpException(
        {
          message: 'Is Product Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['gallerys', 'categorys'],
      order: {
        id: 'DESC',
      },
    });

    if (!product) {
      throw new HttpException(
        {
          message: 'Is Product Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);

      if (!product) {
        throw new HttpException(
          {
            message: 'Is Product Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productCreate = this.productRepository.create(updateProductDto);

      await this.productRepository.update(id, productCreate);

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Update Product Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const product = await this.findOne(id);

      if (!product) {
        throw new HttpException(
          {
            message: 'Is Product Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.productRepository.delete(id);

      return `DELETE PRODUCT ID: ${id} SUCCESS`;
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

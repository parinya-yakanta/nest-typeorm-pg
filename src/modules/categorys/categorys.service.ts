import { Category } from './entities/category.entity';
import { CategoryRepository } from './categorys.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategorysService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);

      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Category Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      const category = await this.categoryRepository.find({
        order: {
          id: 'DESC',
        },
      });

      if (!category) {
        throw new HttpException(
          {
            message: 'Is Category Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return category;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Category Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id, {
      order: {
        id: 'DESC',
      },
    });

    if (!category) {
      throw new HttpException(
        {
          message: 'Is Category Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.findOne(id);

      if (!category) {
        throw new HttpException(
          {
            message: 'Is Category Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.categoryRepository.update(id, updateCategoryDto);

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Update Category Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const category = await this.findOne(id);

      if (!category) {
        throw new HttpException(
          {
            message: 'Is Category Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.categoryRepository.delete(id);

      return `DELETE CATEGORY ID: ${id} SUCCESS`;
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

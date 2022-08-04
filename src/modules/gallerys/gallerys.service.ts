import { ProductRepository } from '../products/products.repository';
import { CreateMultiGalleryDto } from './dto/create-multi-gallery.dto';
import { Gallery } from './entities/gallery.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryRepository } from './gallerys.repository';

@Injectable()
export class GallerysService {
  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createGalleryDto: CreateMultiGalleryDto): Promise<Gallery[]> {
    try {
      const { gallerys, productId } = createGalleryDto;
      const product = await this.productRepository.findOne(productId);
      const galleryItem = [];

      for (const item of gallerys) {
        galleryItem.push({
          product: product,
          name: item.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const galleryItemInsert = await this.galleryRepository.save(galleryItem);

      const galleryItemInsertIds = galleryItemInsert.map((item) => item.id);

      const galleryItems = await this.galleryRepository.findByIds(
        galleryItemInsertIds,
      );

      return galleryItems.map((item) => item);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Gallery Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Gallery[]> {
    try {
      const gallery = await this.galleryRepository.find({
        relations: ['product'],
        order: { id: 'DESC' },
      });

      if (!gallery) {
        throw new HttpException(
          {
            message: 'Is Gallery Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return gallery;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Is Gallery Data Not Found.',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<Gallery> {
    try {
      const gallery = await this.galleryRepository.findOne(id, {
        relations: ['product'],
        order: {
          id: 'DESC',
        },
      });

      if (!gallery) {
        throw new HttpException(
          {
            message: 'Is Gallery Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return gallery;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create Gallery Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    try {
      const gallery = await this.findOne(id);

      if (!gallery) {
        throw new HttpException(
          {
            message: 'Is Gallery Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.galleryRepository.update(id, updateGalleryDto);

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Update Gallery Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const gallery = await this.findOne(id);

      if (!gallery) {
        throw new HttpException(
          {
            message: 'Is Gallery Data Not Found.',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.galleryRepository.delete(id);

      return `DELETE GALLERY ID: ${id} SUCCESS`;
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

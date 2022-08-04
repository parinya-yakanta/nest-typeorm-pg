import { CreateMultiGalleryDto } from './dto/create-multi-gallery.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GallerysService } from './gallerys.service';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('gallerys')
export class GallerysController {
  constructor(private readonly gallerysService: GallerysService) {}

  @Post()
  create(@Body() createGalleryDto: CreateMultiGalleryDto) {
    return this.gallerysService.create(createGalleryDto);
  }

  @Get()
  findAll() {
    return this.gallerysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gallerysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.gallerysService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gallerysService.remove(+id);
  }
}

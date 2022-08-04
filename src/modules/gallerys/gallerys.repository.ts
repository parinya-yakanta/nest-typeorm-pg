import { Gallery } from './entities/gallery.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {}

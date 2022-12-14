import { Product } from './entities/product.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}

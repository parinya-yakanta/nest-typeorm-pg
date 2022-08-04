import { Shop } from './entities/shop.entity';

import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Shop)
export class ShopsRepository extends Repository<Shop> {}

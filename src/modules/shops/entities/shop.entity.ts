import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shops)
  user: User;

  @OneToMany(() => Product, (products) => products.shop)
  products: Product[];

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ name: 'shop_type' })
  shopType: string;

  @Column()
  location: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  shopKeeper: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ name: 'delete_at', nullable: true, default: null })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date = new Date();

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date = new Date();
}

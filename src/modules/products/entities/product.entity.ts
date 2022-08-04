import { Category } from '../../categorys/entities/category.entity';
import { Gallery } from '../../gallerys/entities/gallery.entity';
import { Shop } from '../../shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @OneToMany(() => Gallery, (gallerys) => gallerys.product, {
    cascade: true,
  })
  gallerys: Gallery[];

  @ManyToMany(() => Category)
  @JoinTable()
  categorys: Category[];

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @Column({ nullable: true, default: 0 })
  discount?: number;

  @Column({ name: 'delete_at', nullable: true, default: null })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date = new Date();

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date = new Date();
  save: any;
}

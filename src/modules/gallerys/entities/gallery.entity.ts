import { Product } from '../../products/entities/product.entity';
import { CreateDateColumn, ManyToOne } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('gallerys')
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.gallerys, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @Column()
  name: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ name: 'delete_at', nullable: true, default: null })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date = new Date();

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date = new Date();
}

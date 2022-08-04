import { Shop } from '../../shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Shop, (shops) => shops.user)
  shops: Shop[];

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address?: string;

  @Column()
  phone: string;

  @Column()
  ip: string;

  @Column({ name: 'delete_at', nullable: true, default: null })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date = new Date();

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date = new Date();
}

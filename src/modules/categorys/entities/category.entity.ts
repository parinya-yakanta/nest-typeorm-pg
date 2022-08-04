import { CreateDateColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorys')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

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

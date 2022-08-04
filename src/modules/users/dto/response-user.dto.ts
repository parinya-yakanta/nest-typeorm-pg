import { User } from '../entities/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  @Expose()
  code: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  address?: string;

  @Expose()
  phone: string;

  @Expose({ name: 'IpAddress' })
  ip: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

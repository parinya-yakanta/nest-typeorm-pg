import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Minimum eight characters, at least one letter and one number',
  })
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @IsOptional()
  address?: string;

  @Expose()
  @IsString()
  @IsOptional()
  phone: string;

  deletedAt?: Date;

  updatedAt: Date;

  createdAt: Date;
}

import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto, ip: string): Promise<User> {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const time = new Date().getTime();
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const code = `LZP${year}${month}${date}${time}`;

      Object.assign(createUserDto, {
        password: hashedPassword,
        ip: ip,
        code: code,
      });
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create User Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    try {
      const users = await this.userRepository.find();

      return users.map((user) => new ResponseUserDto(user));
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create User Not Found.',
          error: error.message,
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne(id);

      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Create User Not Found.',
          error: error.message,
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException({
          message: ['User not found.'],
        });
      }

      const { password } = updateUserDto;

      if (password) {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        Object.assign(updateUserDto, { password: hashedPassword });
      }

      await this.userRepository.update(id, updateUserDto);

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Update User Bad Request.',
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException({
          message: ['User not found.'],
        });
      }

      await this.userRepository.delete(id);

      return `DELETE USER ID: ${id} SUCCESS`;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ username });

    return user;
  }

  async getByUsername(username: string) {
    const user = await this.userRepository.findOneOrFail({ username });

    const { password, ...result } = user;
    return result;
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await this.knex.table<User>('users');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex
        .table<User>('users')
        .insert({ ...createUserDto });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table<User>('users').where('id', id);

    if (!users[0]) throw new NotFoundException(`User doesn't exist`);

    return { users };
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    try {
      const users = await this.knex
        .table<User>('users')
        .where('id', id)
        .update({ ...updateUserDto });

      if (!users[0]) throw new NotFoundException(`User doesn't exist`);

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException(`User ${id} does not exist`);

    const users = await this.knex.table<User>('users').where('id', id).del();

    if (!users[0]) throw new NotFoundException(`User doesn't exist`);

    return { users };
  }
}

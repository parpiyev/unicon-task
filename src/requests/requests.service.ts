import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Task } from 'src/tasks/interface/tasks.interface';
import { User } from 'src/users/interface/users.interface';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './interface/request.interface';

@Injectable()
export class RequestsService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll(query) {
    let requests;

    if (query.isController)
      requests = await this.knex
        .select<Request>(
          'requests.id AS id',
          'requests.task AS task',
          'requests.text AS text',
          'requests.status AS status',
          'users.firstName AS firstName',
          'users.lastName AS lastName',
          'users.email AS email',
        )
        .from('requests')
        .innerJoin('users', 'requests.createdBy', 'users.id')
        .where({ controller: query.user_id, task: query.task_id });
    else
      requests = await this.knex
        .select<Request>(
          'requests.id AS id',
          'requests.task AS task',
          'requests.text AS text',
          'requests.status AS status',
          'users.firstName AS firstName',
          'users.lastName AS lastName',
          'users.email AS email',
        )
        .from('requests')
        .innerJoin('users', 'requests.controller', 'users.id')
        .where({ createdBy: query.user_id });
    return { requests };
  }

  async create(createRequestDto: CreateRequestDto) {
    try {
      const users = await this.knex
        .table<User>('users')
        .where('id', createRequestDto.createdBy);

      const tasks = await this.knex
        .table<Task>('tasks')
        .where('id', createRequestDto.task);

      if (!users[0] || !tasks[0])
        throw new NotFoundException(`User or Task doesn't exist`);

      if (!tasks[0].recipients.includes(users[0].id))
        throw new NotFoundException(`This task is not assigned to you`);

      const request = await this.knex('requests')
        .insert<Request>({
          ...createRequestDto,
          controller: tasks[0].createdBy,
        })
        .returning<Request>('*');

      return { request };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException(`Request ${id} does not exist`);

    const requests = await this.knex.table<Request>('requests').where('id', id);

    if (!requests[0]) throw new NotFoundException(`Request doesn't exist`);

    return { requests };
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    try {
      const users = await this.knex
        .table<User>('users')
        .where('id', updateRequestDto.controller);
      const requests = await this.knex
        .table<Request>('requests')
        .where('id', id);

      if (users[0].id !== requests[0].controller)
        throw new NotFoundException(`You can only change what belongs to you`);

      const request = await this.knex
        .table('requests')
        .where('id', id)
        .update({ status: updateRequestDto.status })
        .returning<Request>('*');

      if (!request[0]) throw new NotFoundException(`Request doesn't exist`);

      return { request };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException(`Request ${id} does not exist`);

    const requests = await this.knex
      .table<Request>('requests')
      .where('id', id)
      .del();

    if (!requests[0]) throw new NotFoundException(`Request doesn't exist`);

    return { requests };
  }
}

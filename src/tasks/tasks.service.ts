import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interface/tasks.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll(query) {
    let tasks;

    if (query.isController)
      tasks = await this.knex
        .table<Task>('tasks')
        .where({ createdBy: query.user_id, isDeleted: false });
    else {
      tasks = await this.knex
        .select(
          'tasks.id AS id',
          'tasks.title AS title',
          'tasks.discription AS discription',
          'tasks.recipients AS recipients',
          'tasks.createdBy AS createdBy',
          'users.firstName AS firstName',
          'users.lastName AS lastName',
          'users.email AS email',
        )
        .from('tasks')
        .innerJoin('users', 'tasks.createdBy', 'users.id')
        .where({ isDeleted: false });

      tasks = tasks.filter((e) => {
        return e.recipients.includes(Number(query.user_id));
      });
    }

    return { tasks };
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const tasks = await this.knex
        .table('tasks')
        .insert<Task>({ ...createTaskDto });

      return { tasks };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException(`Task ${id} does not exist`);

    const tasks = await this.knex.table<Task>('tasks').where('id', id);

    if (!tasks[0]) throw new NotFoundException(`Task doesn't exist`);

    return { tasks };
  }

  async update(id: number, updateTaskDto: CreateTaskDto) {
    try {
      const tasks = await this.knex
        .table('tasks')
        .where('id', id)
        .update<Task>({ ...updateTaskDto });

      if (!tasks[0]) throw new NotFoundException(`Task doesn't exist`);

      return { tasks };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException(`Task ${id} does not exist`);

    const tasks = await this.knex.table<Task>('tasks').where('id', id).del();

    if (!tasks[0]) throw new NotFoundException(`Task doesn't exist`);

    return { tasks };
  }
}

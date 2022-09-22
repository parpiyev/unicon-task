import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} from './config/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        version: '14.5',
        useNullAsDefault: true,
        connection: {
          host: DB_HOST,
          port: Number(DB_PORT),
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
        },
      },
    }),
    UsersModule,
    TasksModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

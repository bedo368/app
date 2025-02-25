import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './modules/tasks/tasks.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TaskEnetity } from './modules/tasks/entitis/task.entity';
import { UserEntity } from './modules/auth/entities/user.entity';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // <-- Use 'postgres' since YugabyteDB is wire-compatible
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'yugabyte',
      password: process.env.DB_PASS || 'yugabyte',
      database: process.env.DB_NAME || 'yugabyte',
      synchronize: true, // For development only. Don't use 'true' in production.,
      entities: [TaskEnetity, UserEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

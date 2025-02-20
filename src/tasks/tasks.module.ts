// task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEnetity } from './entitis/task.entity';
import { TASK_REPOSITORY, taskRepositoryProvider } from './providers/task.provider';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    // ضروري لكي يتعرّف NestJS وTypeORM على الكيان TaskEntity
    TypeOrmModule.forFeature([TaskEnetity]),

  ],
  controllers:[TasksController],
  providers: [
    taskRepositoryProvider, // نضيف الـ provider الذي عرفناه
    TasksService,            // الخدمة
  ],
  // في حال أردنا استعمال المستودع خارج هذا الموديول
  exports: [TASK_REPOSITORY],
})
export class TasksModule {}

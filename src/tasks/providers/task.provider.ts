// task.repository.provider.ts
import { DataSource } from 'typeorm';
import { createTaskRepository } from '../repo/task.repo';
import { ITaskRepository } from '../repo/type.rpo.interface';

// اختيار اسم رمزي للمزود (Token)
export const TASK_REPOSITORY = 'TASK_REPOSITORY';

// إنشاء المزود (Provider) لاستخدامه في الوحدات (Modules)
export const taskRepositoryProvider = {
  provide: TASK_REPOSITORY,
  useFactory: (dataSource: DataSource):ITaskRepository => {
    return createTaskRepository(dataSource);
  },
  inject: [DataSource], // حقن الـ DataSource من NestJS (يتطلب إعداد TypeOrmModule)
};

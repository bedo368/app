// task.repository.provider.ts
import { DataSource } from 'typeorm';
import { UserAuthInterface } from '../repo/user.atuh.interface';
import { createUserAuthRepo } from '../repo/user.auth.repo';

// اختيار اسم رمزي للمزود (Token)
export const USERAUTHREPO = 'USER_AUTH_REPOSITORY';

// إنشاء المزود (Provider) لاستخدامه في الوحدات (Modules)
export const userAuthRepoProvider = {
  provide: USERAUTHREPO,
  useFactory: (dataSource: DataSource):UserAuthInterface => {
    return createUserAuthRepo(dataSource);
  },
  inject: [DataSource], // حقن الـ DataSource من NestJS (يتطلب إعداد TypeOrmModule)
};

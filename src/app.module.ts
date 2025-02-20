import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule ,
    TypeOrmModule.forRoot({
      type: 'postgres',   // <-- Use 'postgres' since YugabyteDB is wire-compatible
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'yugabyte',
      password: process.env.DB_PASS || 'yugabyte',
      database: process.env.DB_NAME || 'yugabyte',
      synchronize: true,  // For development only. Don't use 'true' in production.,
      autoLoadEntities: true
    }),
  ],
  controllers: [
    
  ],
  providers: [],
})
export class AppModule {}

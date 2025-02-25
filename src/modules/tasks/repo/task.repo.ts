import {
  DataSource,
  Repository,
} from 'typeorm';
import { TaskEnetity } from '../entitis/task.entity';
import { TaskStatus } from '../task.model';
import { NotFoundException } from '@nestjs/common';
import { handleDatabaseError } from 'src/utls/handle_database_error';
import { GetTasksFilterDto } from '../dto/get-tasks.dto';

// دالة تنشئ وتُعيد مستودعاً مخصّصاً
export const createTaskRepository = (dataSource: DataSource) => {
  const baseRepository: Repository<TaskEnetity> =
    dataSource.getRepository<TaskEnetity>(TaskEnetity);

  return baseRepository.extend({
    async markAsCompleted(this: Repository<TaskEnetity> & any, taskId: string) {
      try {
        const task = await this.getTaskById(taskId);
        task.isCompleted = true;
        return await this.save(task);
      } catch (error) {
        handleDatabaseError(error, 'Failed to mark task as completed');
      }
    },

    async createNewTask(
      this: Repository<TaskEnetity> ,

      title: string,
      description: string,
      status: TaskStatus,
    ) :Promise<TaskEnetity> {
      try {
        const task = new TaskEnetity();
        task.title = title;
        task.description = description;
        task.status = status;
        return await this.save(task);
      } catch (error) {
        
        handleDatabaseError(error, 'Failed to create new task');
        throw error;
      }
    },

    async getAllTasks(this: Repository<TaskEnetity>, getTasksDto: GetTasksFilterDto): Promise<TaskEnetity[]> {
      try {
        const query = this.createQueryBuilder('task');
    
        if (getTasksDto.status) {
          query.andWhere('task.status = :status', { status: getTasksDto.status });
        }
        if (getTasksDto.search) {
          query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${getTasksDto.search}%` });
        }
    
        if (getTasksDto.page) {
          query.skip((getTasksDto.page - 1) * 10);
          query.take(10);
        }
    
        // Log the generated SQL query for debugging
        console.log(query.getSql());
    
        const tasks = await query.getMany();
        return tasks;
      } catch (error) {
        handleDatabaseError(error, 'Failed to fetch all tasks');
        return [];
      }
    },

    async deleteTask(
      this: Repository<TaskEnetity> ,
      id: string,
    ): Promise<void> {
      try {
        const result = await this.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
      } catch (error) {
        handleDatabaseError(error, 'Failed to delete task');
      }
    },

    async updateStatus(
      this: Repository<TaskEnetity> & any,
      id: string,
      status: string,
    ) {
      try {
        const result = await this.getTaskById(id);
        result.status = status;

        await this.save(result);

        return result;
      } catch (error) {
        handleDatabaseError(error, 'Failed to update task status');
      }
    },

    async getTaskById(this: Repository<TaskEnetity> & any, taskId: string) {
      try {
        const task = await this.findOne(taskId);
        if (!task) {
          throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
        return task;
      } catch (error) {
        handleDatabaseError(error, 'Failed to fetch task by ID');
      }
    },

    async updateTask(
      this: Repository<TaskEnetity> & any,

      id: string,
      title: string,
      description: string,
      status: TaskStatus,
    ) {
      try {
        const task = await this.getTaskById(id);
        if (!task) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.status = status ?? task.status;
        await this.save(task);
        return task;
      } catch (error) {
        handleDatabaseError(error, 'Failed to update task');
      }
    },
  });
};

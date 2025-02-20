import {
  DataSource,
  EntityNotFoundError,
  QueryFailedError,
  Repository,
  TypeORMError,
} from 'typeorm';
import { TaskEnetity } from '../entitis/task.entity';
import { TaskStatus } from '../task.model';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { handleDatabaseError } from 'src/utls/handle_database_error';

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
      this: Repository<TaskEnetity> & any,

      title: string,
      description: string,
      status: TaskStatus,
    ) {
      try {
        const task = new TaskEnetity();
        task.title = title;
        task.description = description;
        task.status = status;
        return await this.save(task);
      } catch (error) {
        handleDatabaseError(error, 'Failed to create new task');
      }
    },

    async getAllTasks(this: Repository<TaskEnetity> & any) {
      try {
        return await this.find();
      } catch (error) {
        handleDatabaseError(error, 'Failed to fetch all tasks');
      }
    },

    async deleteTask(
      this: Repository<TaskEnetity> & any,
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
        const result = await this.update(id, { status });

        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return this.getTaskById(id);
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
        const task = await this.findOne({ where: { id } });
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

    // Function to handle SQL errors and throw meaningful messages
  });
};

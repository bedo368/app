import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from './providers/task.provider';
import { ITaskRepository } from './repo/type.rpo.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { TaskEnetity } from './entitis/task.entity';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
  ) {}

  /**
   * Retrieve all tasks.
   */
  async getTasks(getTasksDto: GetTasksFilterDto ): Promise<TaskEnetity[]> {
    return this.taskRepository.getAllTasks(getTasksDto);
  }

  /**
   * Create a new task.
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEnetity> {
    const { title, description, status } = createTaskDto;
    return this.taskRepository.createNewTask(title, description, status ?? TaskStatus.OPEN);
  }

  /**
   * Get a single task by its ID.
   */
  async getTaskById(id: string): Promise<TaskEnetity> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return task;
  }

  /**
   * Update a task (title, description, status).
   */
  async updateTask(
    id: string,
    title?: string,
    description?: string,
    status?: TaskStatus,
  ): Promise<TaskEnetity> {
    return this.taskRepository.updateTask(id, title, description, status );
  }

  /**
   * Delete a task by its ID.
   */
  async deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }

  /**
   * Update only the status of a task.
   */
  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEnetity> {
    return this.taskRepository.updateStatus(id, status);
  }
}

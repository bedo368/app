import { GetTasksFilterDto } from './../dto/get-tasks.dto';
import { get } from 'http';
// task.repository.interface.ts
import { Repository } from 'typeorm';
import { TaskEnetity } from '../entitis/task.entity';
import { TaskStatus } from '../task.model';

export interface TaskRepositoryInterface {
  markAsCompleted(taskId: string): Promise<TaskEnetity>;
  getTaskById(taskId: string): Promise<TaskEnetity>;
  createNewTask(
    title: string,
    description: string,
    status?: TaskStatus,
  ): Promise<TaskEnetity>;
  getAllTasks(getTasksFilterDto: GetTasksFilterDto): Promise<TaskEnetity[]>;
  deleteTask(id: string): Promise<void>; // 1 parameter
  updateStatus(id: string, status: string): Promise<TaskEnetity>;
  updateTask(
    id?: string,
    title?: string,
    description?: string,
    status?: TaskStatus,
  ): Promise<TaskEnetity>;
}

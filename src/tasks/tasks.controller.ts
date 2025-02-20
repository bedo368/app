import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Patch, 
  Post, 
  Put 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto copy';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(200)
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return {
      success: true,
      message: 'Tasks retrieved successfully.',
      data: {
        tasks,
        total: tasks.length, // placed inside data
      },
    };
  }

  @Post('/create-task')
  @HttpCode(201)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const createdTask = await this.tasksService.createTask(createTaskDto);
    return {
      success: true,
      message: 'Task created successfully.',
      data: {
        createdTask,
      },
    };
  }

  @Get(':id')
  @HttpCode(200)
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);
    return {
      success: true,
      message: `Task with ID "${id}" retrieved successfully.`,
      data: {
        task,
      },
    };
  }

  @Put(':id')
  @HttpCode(200)
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const { title, description, status } = updateTaskDto;
    const updatedTask = await this.tasksService.updateTask(id, title, description, status);
    return {
      success: true,
      message: `Task with ID "${id}" updated successfully.`,
      data: {
        updatedTask,
      },
    };
  }

  @Patch(':id/status')
  @HttpCode(200)
  async updateTaskStatus(@Param('id') id: string, @Body('status') updateTaskStatus: UpdateTaskStatusDto) {
    const updatedTask = await this.tasksService.updateTaskStatus(id, updateTaskStatus.status);
    return {
      success: true,
      message: `Task status for ID "${id}" updated successfully.`,
      data: {
        updatedTask,
      },
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
    return {
      success: true,
      message: `Task with ID "${id}" deleted successfully.`,
      data: {
        id, // or null if you prefer
      },
    };
  }
}

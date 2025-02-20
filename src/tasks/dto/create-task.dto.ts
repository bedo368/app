import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
  @IsOptional() // Makes this field optional
  @IsEnum(TaskStatus, { message: 'Status must be a valid TaskStatus value [OPEN, IN_PROGRESS, DONE]' })
  status?: TaskStatus; // This field is now optional
}
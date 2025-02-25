import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus , { message: 'Status must be a valid TaskStatus value [OPEN, IN_PROGRESS, DONE]' })
  status: TaskStatus ;
}
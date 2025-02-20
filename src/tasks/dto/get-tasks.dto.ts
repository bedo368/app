import { ParseIntPipe } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";



export class GetTasksFilterDto{

  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @IsString()
  status: string

  @IsOptional()
  @IsInt()
  @Type(() => Number) // Add this decorator to transform the value
  page: number;

}
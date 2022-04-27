import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { ResTaskDto } from './task.dto';

export enum SortTasksEnum {
  'UP_NAME' = 'UP_NAME',
  'DOWN_NAME' = 'DOWN_NAME',
  'UP_EMAIL' = 'UP_EMAIL',
  'DOWN_EMAIL' = 'DOWN_EMAIL',
  'UP_DESCRIPTION' = 'UP_DESCRIPTION',
  'DOWN_DESCRIPTION' = 'DOWN_DESCRIPTION',
  'UP_DONE' = 'UP_DONE',
  'DOWN_DONE' = 'DOWN_DONE',
}

export class TasksDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value && +value)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value && +value)
  @Min(2)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsEnum(SortTasksEnum)
  sort?: SortTasksEnum;
}

class ResPagination {
  page: number;
  limit: number;
  length: number;
}

export class ResTasksDto {
  data: ResTaskDto[];
  pagination: ResPagination;
}

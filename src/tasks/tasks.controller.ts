import {
  Param,
  Body,
  Controller,
  Delete,
  HttpStatus,
  Patch,
  Post,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { RoleGuard } from '../_utils/guards/role.guard';
import { RoleEnum } from '../_utils/enum';

import { ErrorCode, Exception } from '../_core/exception/exception';

import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { FindTaskDto } from './dto/find-task.dto';
import { TasksDto } from './dto/list-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      const result = await this.tasksService.create(body);
      return result;
    } catch (err) {
      throw new Exception(
        ErrorCode.DataBase,
        'Error create task',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }

  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  @Patch()
  async edit(@Body() body: EditTaskDto) {
    try {
      const result = await this.tasksService.edit(body);
      return result;
    } catch (err) {
      console.log(err);
      throw new Exception(
        ErrorCode.DataBase,
        'Error edit task',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }

  @UseGuards(RoleGuard([RoleEnum.ADMIN]))
  @Delete('/:id')
  async delete(@Param() { id }: DeleteTaskDto) {
    try {
      const result = await this.tasksService.delete(id);
      return result;
    } catch (err) {
      throw new Exception(
        ErrorCode.DataBase,
        'Error delete task',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }

  @Get()
  async list(@Query() query: TasksDto) {
    try {
      const result = await this.tasksService.list(query);
      return result;
    } catch (err) {
      throw new Exception(
        ErrorCode.DataBase,
        'Error find list task',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }

  @Get('/:id')
  async find(@Param() { id }: FindTaskDto) {
    try {
      const result = await this.tasksService.find(id);
      return result;
    } catch (err) {
      throw new Exception(
        ErrorCode.DataBase,
        'Error find task',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }
}

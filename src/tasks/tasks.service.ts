import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ResTaskDto } from './dto/task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksDto, ResTasksDto, SortTasksEnum } from './dto/list-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  public async edit(params: EditTaskDto): Promise<ResTaskDto> {
    const { id, ...data } = params;

    const result = await this.prismaService.tasks.update({
      where: {
        id: id,
      },
      data,
      select: {
        id: true,
        email: true,
        isDone: true,
        userName: true,
        description: true,
        isDescriptionEdit: true,
      },
    });

    return result;
  }

  public async create(data: CreateTaskDto): Promise<ResTaskDto> {
    const result = await this.prismaService.tasks.create({
      data,
      select: {
        id: true,
        email: true,
        isDone: true,
        userName: true,
        description: true,
        isDescriptionEdit: true,
      },
    });

    return result;
  }

  public async list({
    page = 1,
    limit = 3,
    sort = SortTasksEnum.UP_NAME,
  }: TasksDto): Promise<ResTasksDto> {
    const skip = (page - 1) * limit;
    const orderBy = {};

    switch (sort) {
      case SortTasksEnum.UP_NAME:
        orderBy['userName'] = 'asc';
        break;
      case SortTasksEnum.DOWN_NAME:
        orderBy['userName'] = 'desc';
        break;
      case SortTasksEnum.UP_DESCRIPTION:
        orderBy['description'] = 'asc';
        break;
      case SortTasksEnum.DOWN_DESCRIPTION:
        orderBy['description'] = 'desc';
        break;
      case SortTasksEnum.UP_DONE:
        orderBy['isDone'] = 'asc';
        break;
      case SortTasksEnum.DOWN_DONE:
        orderBy['isDone'] = 'desc';
        break;
      case SortTasksEnum.UP_EMAIL:
        orderBy['email'] = 'asc';
        break;
      case SortTasksEnum.DOWN_EMAIL:
        orderBy['email'] = 'desc';
        break;
      default:
        break;
    }

    const data = await this.prismaService.tasks.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        isDone: true,
        userName: true,
        description: true,
        isDescriptionEdit: true,
      },
      orderBy,
    });

    const length = await this.prismaService.tasks.aggregate({
      _count: true,
    });

    const result = {
      data,
      pagination: {
        page,
        limit,
        length: length._count,
      },
    };

    return result;
  }

  public async find(id: string): Promise<ResTaskDto> {
    const result = await this.prismaService.tasks.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        isDone: true,
        userName: true,
        description: true,
        isDescriptionEdit: true,
      },
    });

    return result;
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.prismaService.tasks.delete({
        where: {
          id,
        },
      });

      return true;
    } catch {
      return false;
    }
  }
}

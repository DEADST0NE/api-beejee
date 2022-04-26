import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ResTaskDto } from './dto/task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

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
      },
    });

    return result;
  }

  public async list(): Promise<ResTaskDto[]> {
    const result = await this.prismaService.tasks.findMany({
      select: {
        id: true,
        email: true,
        isDone: true,
        userName: true,
        description: true,
      },
    });

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

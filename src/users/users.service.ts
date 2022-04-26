import { Injectable } from '@nestjs/common';
import { users as userModel } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create({
    login,
    hash,
    roleId,
  }: CreateUserDto): Promise<userModel> {
    const user = await this.prismaService.users.create({
      data: {
        login,
        password: hash,
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return user;
  }

  public async findOne(login: string): Promise<userModel | undefined> {
    const user = await this.prismaService.users.findUnique({
      where: {
        login,
      },
    });

    return user;
  }
}

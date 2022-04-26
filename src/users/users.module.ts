import { Module } from '@nestjs/common';

import { AppVariablesModule } from '../_core/variables';

import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

@Module({
  imports: [AppVariablesModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppVariablesModule } from '../_core/variables';

import { PrismaService } from '../../prisma/prisma.service';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AppVariablesModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}

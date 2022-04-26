import { TasksModule } from './tasks/tasks.module';
import { BcryptModule } from './_utils/bcrypt/bcrypt.module';
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { AppThrottlerModule } from './_core/throttler';
import { AppVariablesModule } from './_core/variables';

import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './_core/logger/logger.module';

@Module({
  imports: [
    TasksModule,
    BcryptModule,
    // Module connect: env, db, throttler
    AppVariablesModule,
    AppThrottlerModule,
    // Module Logger
    AuthModule,
    LoggerModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AppVariablesModule } from '../_core/variables';

import { UsersModule } from '../users/users.module';
import { TokenModule } from '../_utils/token/token.module';
import { BcryptModule } from '../_utils/bcrypt/bcrypt.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    PassportModule,
    AppVariablesModule,
    BcryptModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

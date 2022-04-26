import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

import { AppVariablesModule } from '../../_core/variables';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '60s' },
    }),
    AppVariablesModule,
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}

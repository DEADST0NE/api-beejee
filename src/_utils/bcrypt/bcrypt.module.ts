import { Module } from '@nestjs/common';

import { BcryptService } from './bcrypt.service';

import { AppVariablesModule } from '../../_core/variables';

@Module({
  imports: [AppVariablesModule],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}

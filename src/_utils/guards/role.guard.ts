import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  mixin,
  Type,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { ErrorCode, Exception } from '../../_core/exception/exception';

import { JwtDataDto } from '../../auth/dto/jwt-data.dto';
import { RoleEnum } from '../enum';

export const RoleGuard = (role: RoleEnum[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user: JwtDataDto = request.user;

      const status = role.includes(user.roleId);

      if (!status) {
        throw new Exception(
          ErrorCode.Unauthorized,
          'Error no access',
          HttpStatus.FORBIDDEN,
        );
      }
      return true;
    }
  }

  return mixin(RoleGuardMixin);
};

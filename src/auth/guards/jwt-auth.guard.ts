import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ErrorCode, Exception } from '../../_core/exception/exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new Exception(
        ErrorCode.Unauthorized,
        'Error token not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}

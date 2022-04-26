import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { ErrorCode, Exception } from '../_core/exception/exception';

import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const result = await this.authService.login(body);
      return result;
    } catch (err) {
      throw new Exception(
        ErrorCode.Unauthorized,
        'Error user unauthorized',
        HttpStatus.UNAUTHORIZED,
        err,
      );
    }
  }
}

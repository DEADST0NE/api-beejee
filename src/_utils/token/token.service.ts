import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private create(
    data: Record<string, unknown>,
    secret: string,
    expiresIn: string,
  ) {
    return this.jwtService.sign(data, {
      secret,
      expiresIn,
    });
  }

  public access(data: Record<string, unknown>) {
    const secret = this.configService.get('APP_JWT_ACCESS_TOKEN_SECRET');
    const expiresIn = this.configService.get<string>(
      'APP_JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );

    return this.create(data, secret, expiresIn);
  }

  public refresh(data: Record<string, unknown>) {
    const secret = this.configService.get('APP_JWT_REFRESH_TOKEN_SECRET');
    const expiresIn = this.configService.get<string>(
      'APP_JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );

    return this.create(data, secret, expiresIn);
  }

  public decode(token: string): { id: string; exp: number } {
    return this.jwtService.decode(token) as any;
  }

  public isExpiredRefresh(token: string) {
    const secret = this.configService.get('APP_JWT_REFRESH_TOKEN_SECRET');
    let status = false;

    try {
      this.jwtService.verify(token, {
        secret,
      });
    } catch {
      status = true;
    }
    return status;
  }
}

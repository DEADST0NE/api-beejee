import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_JWT_ACCESS_TOKEN_SECRET,
    });
  }

  private prismaService = new PrismaService();

  async validate(payload: { id: string } | null) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    const { isBlocked } = await this.prismaService.users.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (isBlocked) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

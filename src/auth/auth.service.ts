import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

import { UsersService } from '../users/users.service';
import { TokenService } from '../_utils/token/token.service';
import { BcryptService } from '../_utils/bcrypt/bcrypt.service';
import { RefistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly bcryptService: BcryptService,
  ) {}

  private createTokens(data: { id: string; roleId: number }) {
    const accessToken = this.tokenService.access(data);

    return {
      accessToken,
    };
  }

  public async login({ login, password }: LoginDto) {
    const user = await this.usersService.findOne(login);

    const { id, roleId, isBlocked } = user;

    if (isBlocked) {
      throw 'User lock';
    }

    const isCompare = await this.bcryptService.compare(password, user.password);

    if (!isCompare) {
      throw 'Password not match';
    }

    const tokens = this.createTokens({ id, roleId });
    return tokens;
  }

  public async registration({ login, password, roleId }: RefistrationDto) {
    const candidate = await this.usersService.findOne(login);

    if (candidate) {
      throw 'Login busy';
    }

    const hash = await this.bcryptService.hash(password);

    const user = await this.usersService.create({ login, hash, roleId });

    const tokens = this.createTokens({ id: user.id, roleId: user.roleId });
    return tokens;
  }
}

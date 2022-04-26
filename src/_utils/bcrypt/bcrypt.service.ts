import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      +this.configService.get<string>('APP_BCRYPT_SALT_ROUNDS'),
    );

    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    const status = await bcrypt.compare(password, hash);

    return status;
  }
}

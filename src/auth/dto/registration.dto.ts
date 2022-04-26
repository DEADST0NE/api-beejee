import { IsNumber, IsString } from 'class-validator';

export class RefistrationDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  roleId: number;
}

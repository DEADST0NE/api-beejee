import { IsString, IsEmail } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;
}

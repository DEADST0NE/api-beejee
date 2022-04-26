import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class EditTaskDto {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

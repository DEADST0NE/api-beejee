import { Transform } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

import { stripTags } from '../../_utils/helpers';

export class CreateTaskDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }: { value: string }) => stripTags(value))
  description: string;
}

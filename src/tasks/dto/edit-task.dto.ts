import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsBoolean,
} from 'class-validator';

import { stripTags } from '../../_utils/helpers';

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
  @Transform(({ value }: { value: string }) => stripTags(value))
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @IsOptional()
  @IsBoolean()
  isDescriptionEdit?: boolean;
}

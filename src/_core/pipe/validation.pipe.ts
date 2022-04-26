import { HttpStatus } from '@nestjs/common';
import { ValidationError, ValidatorOptions } from 'class-validator';

import { ErrorCode, Exception } from '../exception/exception';

const getErrorDitails = (err: ValidationError[]) => {
  return err?.map((i) => {
    if (!i.children.length) {
      return {
        field: i.property,
        error: Object.keys(i.constraints).map((key) => i.constraints[key]),
      };
    }

    return {
      field: i.property,
      error: i.constraints ? i.constraints : getErrorDitails(i.children),
    };
  });
};

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export const ValidationPipeOptions: ValidationPipeOptions = {
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    throw new Exception(
      ErrorCode.DataValidate,
      'Validation error',
      HttpStatus.BAD_REQUEST,
      getErrorDitails(errors),
    );
  },
};

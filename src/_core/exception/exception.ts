import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  DataValidate = 20,
  Unauthorized = 30,
  DataBase = 40,
}

// Custom exception
export class Exception extends HttpException {
  constructor(
    errorCode: number,
    message: string,
    httpStatus = HttpStatus.BAD_REQUEST,
    details: any = null,
  ) {
    super(
      {
        message,
        errorCode,
        details: details || message,
      },
      httpStatus,
    );
  }
}

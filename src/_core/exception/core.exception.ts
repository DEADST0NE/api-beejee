import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorCode } from './exception';

import { Logger } from '../logger/logger.service';

type CustomExceptionType = {
  message: string;
  errorCode: ErrorCode;
  details?: any;
};

// Глобальный перехвадчик exception
@Catch(HttpException)
export class CoreExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CoreExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { url, method, body, query, params } = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as CustomExceptionType;

    // Объект данных для logger
    const loggerData = {
      data: {
        url,
        method,
        body,
        query,
        params,
      },
      exceptionError: error,
    };

    // Switch для определеных логов в зависимости от ошибки
    switch (status) {
      case 500:
        this.logger.error(loggerData);
        break;
      case 400:
        this.logger.warn(loggerData);
        break;
      default:
        this.logger.debug(loggerData);
        break;
    }

    delete error?.details?.config?.headers;

    // Возвращаем ответ ошибки
    response.status(status).json(error);
  }
}

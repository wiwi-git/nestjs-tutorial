import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { NODE_ENV } = process.env;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string;

    if (request.body) {
      if (request.body.password) delete request.body.password;
      if (request.body.newPassword) delete request.body.newPassword;
    }

    switch (exception.constructor) {
      case HttpException: // HttpBadRequest로 감싸지 못한 HttpException 처리
        const defaultHttpError = exception as HttpException;
        status = defaultHttpError.getStatus();
        message = defaultHttpError.message;
        break;

      default: // default
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as any).message ?? 'internal server error';
        break;
    }

    Logger.error({
      status,
      message,
      timestamp: new Date().toUTCString(),
      path: request.url,
      headers: request.headers,
      params: request.params,
      query: request.query,
      body: request.body,
      stack: (exception as any).stack,
    });

    const responseContent = (exception as any).content ?? {
      message,
    };
    response.status(status).json(responseContent);
  }
}

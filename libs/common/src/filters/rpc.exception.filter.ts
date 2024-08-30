import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError();
    const message = exception.message;

    // TODO: Handle this better
    if (message.startsWith('Empty response.')) {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Service is unavailable.',
      });
    }

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    if (typeof error === 'object' && 'statusCode' in error) {
      status = +error.statusCode;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

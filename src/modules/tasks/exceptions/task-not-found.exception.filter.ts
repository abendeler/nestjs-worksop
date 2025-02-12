import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class TaskNotFoundException extends Error {
  constructor(
    public readonly source: string,
    public readonly creator: string,
    public readonly message: string,
  ) {
    super(message);
  }
}

@Catch(TaskNotFoundException)
export class TaskNotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TaskNotFoundExceptionFilter.name);

  catch(exception: TaskNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponsePayload = {
      statusCode: HttpStatus.NOT_FOUND,
      message: `Resource(s) not found for ${exception.creator}`,
      timestamp: new Date().toISOString(),
    };

    this.logger.warn(errorResponsePayload);

    response.status(HttpStatus.NOT_FOUND).json(errorResponsePayload);
  }
}

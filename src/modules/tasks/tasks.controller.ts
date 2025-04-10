import { Controller } from '@nestjs/common';
import { Task } from './types/entities/task';
import { Pagination } from './types/api/pagination.type';

@Controller('tasks')
export class TasksController {
  // step 1: use a decorator to hook the method to the tasks route
  public async getTasksBycreator(): Promise<Pagination<Task>> {
    // no need to change any code here
    return Promise.resolve({ total: 0, offset: 0, limit: 0, data: [] });
  }

  // step 2: use the same decorator but pass in the param. Call the param "id"
  public getTaskById(
    // step 3: extract the id from the request
    id: string,
  ): unknown {
    // no need to change any code here
    return { id };
  }
}

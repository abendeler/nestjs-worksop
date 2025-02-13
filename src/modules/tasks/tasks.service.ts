import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './types/events/create-task.request';
import { Task } from './types/entities/task';
import { TaskPaginationResponse } from './types/api/task-pagination.response.type';
import { UpdateTaskRequest } from './types/events/update-task.request';
import { TasksRepository } from './types/providers/tasks.repository';
import { PaginationQueryParams } from './types/api/pagination-query-params.type';
import { WithCreator } from './types/partials/with-creator.type';
import { TasksService } from './types/providers/tasks.service';
import { MutateTaskRequestParams } from './types/api/mutate-task-request-params.type';

@Injectable()
export class TasksServiceImplementation implements TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  public async getTasksByCreator({
    creator,
    offset,
    limit,
  }: PaginationQueryParams & WithCreator): Promise<TaskPaginationResponse> {
    return this.tasksRepository.getTasksBycreator(creator, offset, limit);
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(creator, id);
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    return this.tasksRepository.createTask(request);
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return this.tasksRepository.updateTask(request);
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    return this.tasksRepository.markAsComplete(creator, id);
  }

  public async deleteTask(params: MutateTaskRequestParams): Promise<Task> {
    return this.tasksRepository.deleteTask(params);
  }
}

import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Controller,
  UseFilters,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './types/entities/task';
import { ApiTags } from '@nestjs/swagger';
import { TaskNotFoundExceptionFilter } from './exceptions/task-not-found.exception.filter';
import { MutateTaskRequestParamsDto } from './dtos/mutate-task-request-params.model.dto';
import { PaginationQueryParamstDto } from './dtos/pagination-query-params.model.dto';
import { TasksPaginationResponseDto } from './dtos/pagination.model.dto';
import { CreatorDto } from './dtos/creator.model.dto';
import { CreatorAndIdDto } from './dtos/creator-and-id.model.dto';
import { TaskRequestBodyDto } from './dtos/task-request-body.model.dto';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(TaskNotFoundExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':creator')
  public async getTasksBycreator(
    @Param() params: CreatorDto,
    @Query() queryParams: PaginationQueryParamstDto,
  ): Promise<TasksPaginationResponseDto> {
    return this.tasksService.getTasksByCreator({ ...params, ...queryParams });
  }

  @Get(':creator/:id')
  public async getTaskById(
    @Param() { creator, id }: MutateTaskRequestParamsDto,
  ): Promise<Task> {
    return this.tasksService.getTaskById(creator, id);
  }

  @Post(':creator')
  public async createTask(
    @Param() { creator }: CreatorDto,
    @Body() body: TaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.createTask({ ...body, creator });
  }

  @Put(':creator/:id')
  public async updateTask(
    @Param() params: CreatorAndIdDto,
    @Body() body: TaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.updateTask({ ...params, ...body });
  }

  @Patch(':creator/:id/complete')
  public async markAsComplete(
    @Param() { creator, id }: MutateTaskRequestParamsDto,
  ): Promise<Task> {
    return this.tasksService.markAsComplete(creator, id);
  }
}

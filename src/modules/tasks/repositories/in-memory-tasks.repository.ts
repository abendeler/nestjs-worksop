import { Injectable } from '@nestjs/common';
import { v6 as uuidv6 } from 'uuid';
import { TaskNotFoundException } from '../exceptions/task-not-found.exception.filter';
import { CreateTaskRequest } from '../types/events/create-task.request';
import { Task } from '../types/entities/task';
import { TaskPaginationResponse } from '../types/api/task-pagination.response.type';
import { UpdateTaskRequest } from '../types/events/update-task.request';
import { TasksRepository } from '../types/providers/tasks.repository';
import { MutateTaskRequestParams } from '../types/api/mutate-task-request-params.type';

@Injectable()
export class InMemoryTasksRepository implements TasksRepository {
  private readonly tasks: Task[] = [];

  public async getTasksBycreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse> {
    const ownerTasks = this.tasks.filter((task) => task.creator === creator);
    const tasks = ownerTasks.slice(offset, offset + limit);
    return Promise.resolve({
      offset,
      limit,
      total: ownerTasks.length,
      data: tasks,
    });
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    const task = this.tasks.find(
      (task) => task.creator === creator && task.id === id,
    );
    return task
      ? Promise.resolve(task)
      : Promise.reject(
          new TaskNotFoundException('getTaskById', creator, 'task.not.found'),
        );
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    const task = {
      ...request,
      completed: false,
      createdDate: new Date(),
      id: uuidv6(),
    };
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    const { creator, id, description, dueDate, title } = request;
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      const updatedTask = {
        ...this.tasks[taskIndex],
        description,
        dueDate,
        title,
      };
      this.tasks[taskIndex] = updatedTask;
      return Promise.resolve(updatedTask);
    }
    return Promise.reject(
      new TaskNotFoundException('updateTask', creator, 'task.not.found'),
    );
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      const task = this.tasks[taskIndex];
      task.completed = true;
      return Promise.resolve(task);
    }
    return Promise.reject(
      new TaskNotFoundException('markAsComplete', creator, 'task.not.found'),
    );
  }

  public async deleteTask({
    creator,
    id,
  }: MutateTaskRequestParams): Promise<Task> {
    const taskIndex = this.tasks.findIndex(
      (t) => t.creator === creator && t.id === id,
    );
    if (taskIndex !== -1) {
      const [removedTask] = this.tasks.splice(taskIndex, 1);
      return Promise.resolve(removedTask);
    }
    return Promise.reject(
      new TaskNotFoundException('deleteTask', creator, 'task.not.found'),
    );
  }
}

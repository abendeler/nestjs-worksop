import { Injectable } from '@nestjs/common';
import { v6 as uuidv6 } from 'uuid';
import { TaskNotFoundException } from './exceptions/task-not-found.exception.filter';
import { CreateTaskRequest } from './types/events/create-task.request';
import { Task } from './types/entities/task';
import { TaskPaginationResponse } from './types/api/task-pagination.response.type';
import { UpdateTaskRequest } from './types/events/update-task.request';

@Injectable()
export class TasksRepository {
  private readonly tasks: Task[] = [];

  public async getTasksBycreator(
    creator: string,
    offset: number,
    limit: number,
  ): Promise<TaskPaginationResponse> {
    return new Promise((yay) => {
      setTimeout(() => {
        const ownerTasks = this.tasks.filter(
          (task) => task.creator === creator,
        );
        console.log(ownerTasks);

        const tasks = ownerTasks.slice(offset, offset + limit);
        yay({
          offset,
          limit,
          total: ownerTasks.length,
          data: tasks,
        });
      }, 1000);
    });
  }

  public async getTaskById(creator: string, id: string): Promise<Task> {
    return new Promise((yay, nay) => {
      setTimeout(() => {
        const task = this.tasks.find(
          (task) => task.creator === creator && task.id === id,
        );
        if (task) {
          yay(task);
        } else {
          nay(
            new TaskNotFoundException('getTaskById', creator, 'task.not.found'),
          );
        }
      }, 1000);
    });
  }

  public async createTask(request: CreateTaskRequest): Promise<Task> {
    return new Promise((yay) => {
      setTimeout(() => {
        const task = {
          ...request,
          completed: false,
          createdDate: new Date(),
          id: uuidv6(),
        };
        this.tasks.push(task);
        yay(task);
      }, 1000);
    });
  }

  public async updateTask(request: UpdateTaskRequest): Promise<Task> {
    return new Promise((yay, nay) => {
      setTimeout(() => {
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
          yay(updatedTask);
        } else {
          nay(
            new TaskNotFoundException('updateTask', creator, 'task.not.found'),
          );
        }
      }, 1000);
    });
  }

  public async markAsComplete(creator: string, id: string): Promise<Task> {
    return new Promise((yay, nay) => {
      setTimeout(() => {
        const task = this.tasks.find(
          (t) => t.creator === creator && t.id === id,
        );
        if (task) {
          task.completed = true;
          yay(task);
        } else {
          nay(
            new TaskNotFoundException(
              'markAsComplete',
              creator,
              'task.not.found',
            ),
          );
        }
      }, 1000);
    });
  }

  public async deleteTask(creator: string, id: string): Promise<void> {
    return new Promise((yay, nay) => {
      setTimeout(() => {
        const taskIndex = this.tasks.findIndex(
          (t) => t.creator === creator && t.id === id,
        );
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
          yay();
        } else {
          nay(
            new TaskNotFoundException('deleteTask', creator, 'task.not.found'),
          );
        }
      }, 1000);
    });
  }
}

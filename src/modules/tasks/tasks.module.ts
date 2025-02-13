import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksServiceImplementation } from './tasks.service';
import { TasksRepository } from './types/providers/tasks.repository';
import { InMemoryTasksRepository } from './repositories/in-memory-tasks.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksService } from './types/providers/tasks.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: TasksService,
      useClass: TasksServiceImplementation,
    },
    {
      provide: TasksRepository,
      useFactory: (configService: ConfigService) => {
        const repository = configService.getOrThrow<string>(
          'TASKS_REPOSITORY_TYPE',
        );
        return repository === 'inmemory'
          ? InMemoryTasksRepository
          : InMemoryTasksRepository;
      },
      inject: [ConfigService],
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}

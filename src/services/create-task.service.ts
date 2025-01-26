import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';
import { ListsRepository } from 'src/database/contracts/contract-lists-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type CreateTaskServiceRequest = {
  title: string;
  description: string;
  priority: string;
  finishAt: string;
  listId: string;
};

type CreateTaskServiceResponse = {
  task: Task;
};

@Injectable()
export class CreateTaskService {
  constructor(
    private listsRepository: ListsRepository,
    private tasksRepository: TasksRepository,
  ) {}

  async execute({
    title,
    description,
    priority,
    finishAt,
    listId,
  }: CreateTaskServiceRequest): Promise<CreateTaskServiceResponse> {
    const list = await this.listsRepository.findById(listId);
    if (!list) {
      throw new ResourceNotFoundError('List');
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      priority,
      finishAt,
      listId,
    });

    return {
      task,
    };
  }
}

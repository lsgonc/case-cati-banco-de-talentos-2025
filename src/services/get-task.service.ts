import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type GetTaskServiceRequest = {
  id: string;
};

type GetTaskServiceResponse = {
  task: Task;
};

@Injectable()
export class GetTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
  }: GetTaskServiceRequest): Promise<GetTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new ResourceNotFoundError('Task');
    }

    return {
      task,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type UpdateTaskServiceRequest = {
  id: string;
  title: string;
  description: string;
  priority: string;
  finishAt: string;
  finishedAt: Date | null;
  listId: string;
};

type UpdateTaskServiceResponse = {
  task: Task;
};

@Injectable()
export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
    title,
    description,
    priority,
    finishAt,
    finishedAt,
    listId,
  }: UpdateTaskServiceRequest): Promise<UpdateTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new ResourceNotFoundError('Task');
    }

    const updatedTask = await this.tasksRepository.update({
      id,
      title,
      description,
      priority,
      finishAt,
      finishedAt,
      listId,
    });

    return {
      task: updatedTask,
    };
  }
}

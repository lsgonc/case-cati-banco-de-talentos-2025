import { Injectable } from '@nestjs/common';
import { File } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Folder, Storage } from '../storage/contracts/contract-storage';
import { FilesRepository } from 'src/database/contracts/contract-files-repository';

type UploadFileServiceRequest = {
  taskId: string;
  path: string;
};

type UploadFileServiceResponse = {
  file: File;
};

@Injectable()
export class UploadFileService {
  constructor(
    private tasksRepository: TasksRepository,
    private filesRepository: FilesRepository,
    private storage: Storage,
  ) {}

  async execute({
    taskId,
    path,
  }: UploadFileServiceRequest): Promise<UploadFileServiceResponse> {
    const task = await this.tasksRepository.findById(taskId);
    if (!task) {
      await this.storage.delete(path, Folder.ROOT);
      throw new ResourceNotFoundError('Task');
    }

    await this.storage.save(path, Folder.ROOT);
    const file = await this.filesRepository.create({
      path,
      taskId,
    });

    return {
      file,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ReadStream } from 'node:fs';
import { Storage } from '../storage/contracts/contract-storage';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { FilesRepository } from 'src/database/contracts/contract-files-repository';

type DownloadFileServiceRequest = {
  id: string;
};

@Injectable()
export class DownloadFileService {
  constructor(
    private filesRepository: FilesRepository,
    private storage: Storage,
  ) {}

  async execute({ id }: DownloadFileServiceRequest): Promise<ReadStream> {
    const file = await this.filesRepository.findById(id);
    if (!file) {
      throw new ResourceNotFoundError('File');
    }

    return await this.storage.get(file.path);
  }
}

import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ListsRepository } from '../database/contracts/contract-lists-repository';

type DeleteListServiceRequest = {
  id: string;
};

@Injectable()
export class DeleteListService {
  constructor(private listsRepository: ListsRepository) {}

  async execute({ id }: DeleteListServiceRequest): Promise<void> {
    const list = await this.listsRepository.findById(id);
    if (!list) {
      throw new ResourceNotFoundError('List');
    }

    await this.listsRepository.delete(id);
  }
}

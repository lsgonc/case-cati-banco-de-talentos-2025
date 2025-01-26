import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListsRepository } from '../database/contracts/contract-lists-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type UpdateListServiceRequest = {
  id: string;
  title: string;
};

type UpdateListServiceResponse = {
  list: List;
};

@Injectable()
export class UpdateListService {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    id,
    title,
  }: UpdateListServiceRequest): Promise<UpdateListServiceResponse> {
    const list = await this.listsRepository.findById(id);
    if (!list) {
      throw new ResourceNotFoundError('List');
    }

    const updatedList = await this.listsRepository.update({
      id,
      title,
    });

    return {
      list: updatedList,
    };
  }
}

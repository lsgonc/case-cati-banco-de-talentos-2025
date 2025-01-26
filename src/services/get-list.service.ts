import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListsRepository } from '../database/contracts/contract-lists-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type GetListServiceRequest = {
  id: string;
};

type GetListServiceResponse = {
  list: List;
};

@Injectable()
export class GetListService {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    id,
  }: GetListServiceRequest): Promise<GetListServiceResponse> {
    const list = await this.listsRepository.findById(id);
    if (!list) {
      throw new ResourceNotFoundError('List');
    }

    return {
      list,
    };
  }
}

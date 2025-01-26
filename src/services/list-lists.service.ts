import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListsRepository } from '../database/contracts/contract-lists-repository';

type ListListsServiceResponse = {
  lists: List[];
};

@Injectable()
export class ListListsService {
  constructor(private listsRepository: ListsRepository) {}

  async execute(): Promise<ListListsServiceResponse> {
    const lists = await this.listsRepository.findMany();

    return {
      lists,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { List } from '@prisma/client';
import { ListsRepository } from '../database/contracts/contract-lists-repository';

type CreateListServiceRequest = {
  title: string;
};

type CreateListServiceResponse = {
  list: List;
};

@Injectable()
export class CreateListService {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    title,
  }: CreateListServiceRequest): Promise<CreateListServiceResponse> {
    const list = await this.listsRepository.create({
      title,
    });

    return {
      list,
    };
  }
}

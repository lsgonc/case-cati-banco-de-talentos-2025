import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { List } from '@prisma/client';
import {
  CreateList,
  ListsRepository,
  UpdateList,
} from '../../contracts/contract-lists-repository';

@Injectable()
export class PrismaListsRepository implements ListsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateList): Promise<List> {
    return this.prismaService.list.create({ data });
  }

  async update(data: UpdateList): Promise<List> {
    return this.prismaService.list.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.list.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<List | null> {
    return this.prismaService.list.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<List[]> {
    return await this.prismaService.list.findMany();
  }
}

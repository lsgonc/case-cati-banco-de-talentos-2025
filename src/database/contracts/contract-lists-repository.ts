import { List } from '@prisma/client';

export type CreateList = {
  title: string;
};

export type UpdateList = {
  id: string;
  title: string;
};

export abstract class ListsRepository {
  abstract create: (data: CreateList) => Promise<List>;
  abstract update: (data: UpdateList) => Promise<List>;
  abstract delete(id: string): Promise<void>;
  abstract findById: (id: string) => Promise<List | null>;
  abstract findMany: () => Promise<List[]>;
}

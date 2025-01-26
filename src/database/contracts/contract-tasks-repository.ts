import { Task } from '@prisma/client';

export type CreateTask = {
  title: string;
  description: string;
  priority: string;
  finishAt: string;
  listId: string;
};

export type UpdateTask = {
  id: string;
  title: string;
  description: string;
  priority: string;
  finishAt: string;
  finishedAt: Date | null;
  listId: string;
};

export abstract class TasksRepository {
  abstract create: (data: CreateTask) => Promise<Task>;
  abstract update: (data: UpdateTask) => Promise<Task>;
  abstract delete(id: string): Promise<void>;
  abstract findById: (id: string) => Promise<Task | null>;
  abstract findMany: () => Promise<Task[]>;
}

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTasksRepository } from './prisma/repositories/prisma-tasks-repository';
import { TasksRepository } from './contracts/contract-tasks-repository';
import { PrismaFilesRepository } from './prisma/repositories/prisma-files-repository';
import { FilesRepository } from './contracts/contract-files-repository';
import { ListsRepository } from './contracts/contract-lists-repository';
import { PrismaListsRepository } from './prisma/repositories/prisma-lists-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ListsRepository, useClass: PrismaListsRepository },
    { provide: TasksRepository, useClass: PrismaTasksRepository },
    { provide: FilesRepository, useClass: PrismaFilesRepository },
  ],
  exports: [PrismaService, ListsRepository, TasksRepository, FilesRepository],
})
export class DatabaseModule {}

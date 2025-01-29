import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service'; // Assuming you're using Prisma for database access

@Injectable()
export class ListFilesService {
  constructor(private prisma: PrismaService) {}

  async execute(taskId: string) {
    // Fetch files associated with the task from the database
    const files = await this.prisma.file.findMany({
      where: {
        taskId,
      },
      select: {
        id: true,
        path: true,
        createdAt: true,
      },
    });

    // Map the files to a more client-friendly format
    return files.map((file) => ({
      id: file.id,
      name: file.path.split('/').pop(), // Extract the file name from the path
      url: `http://localhost:3333/files/${file.path}`, // Construct the full URL
      createdAt: file.createdAt,
    }));
  }
}
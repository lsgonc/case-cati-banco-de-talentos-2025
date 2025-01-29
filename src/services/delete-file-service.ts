import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service'; // Assuming you're using Prisma
import { unlinkSync } from 'fs'; // For deleting files from the filesystem
import { join } from 'path';

@Injectable()
export class DeleteFileService {
  constructor(private prisma: PrismaService) {}

  async execute(taskId: string, fileId: string) {
    // Find the file in the database
    const file = await this.prisma.file.findUnique({
      where: { id: fileId, taskId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    // Delete the file record from the database
    await this.prisma.file.delete({
      where: { id: fileId },
    });

    return true;
  }
}
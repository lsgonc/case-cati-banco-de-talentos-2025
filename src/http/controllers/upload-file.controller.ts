import {
  Controller,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Post,
  Param,
  Get,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '../../services/upload-file.service';
import { multerOptions } from 'src/storage/multer-options';
import {
  UploadFileParamSchema,
  uploadFileParamSchema,
} from '../schemas/task-schemas';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { ListFilesService } from 'src/services/ListFileService';// New service for listing files
import { DeleteFileService } from 'src/services/delete-file-service';

const paramValidationPipe = new ZodValidationPipe(uploadFileParamSchema);

@Controller('/tasks/:id/files')
export class UploadFileController {
  constructor(
    private uploadFileService: UploadFileService,
    private listFilesService: ListFilesService, // Inject the new service
    private deleteFileService: DeleteFileService
  ) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async handle(
    @Param(paramValidationPipe) { id }: UploadFileParamSchema,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 100,
            message: 'Max file size: 100MB',
          }),
        ],
      }),
    )
    { filename }: Express.Multer.File,
  ) {
    const { file } = await this.uploadFileService.execute({
      path: filename,
      taskId: id,
    });

    return {
      file,
    };
  }

  @Get()
  @HttpCode(200)
  async listFiles(@Param(paramValidationPipe) { id }: UploadFileParamSchema) {
    const files = await this.listFilesService.execute(id);
    return {
      files,
    };
  }

  @Delete(':fileId')
  @HttpCode(204)
  async deleteFile(
    @Param('id') taskId: string,
    @Param('fileId') fileId: string,
  ) {
    const result = await this.deleteFileService.execute(taskId, fileId);
    if (!result) {
      throw new NotFoundException('File not found');
    }
    return;
  }
}
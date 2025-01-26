import { Controller, HttpCode, Param, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DownloadFileService } from '../../services/download-file.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  downloadFileParamSchema,
  DownloadFileParamSchema,
} from '../schemas/task-schemas';

@Controller('/files/:id')
export class DownloadFileController {
  constructor(private downloadFileService: DownloadFileService) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(new ZodValidationPipe(downloadFileParamSchema))
    { id }: DownloadFileParamSchema,
    @Res() res: Response,
  ) {
    const stream = await this.downloadFileService.execute({
      id,
    });

    stream.pipe(res);
  }
}

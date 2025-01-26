import { Controller, Delete, Param, HttpCode } from '@nestjs/common';
import { DeleteListService } from '../../services/delete-list.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  DeleteListParamSchema,
  deleteListParamSchema,
} from '../schemas/list-schemas';

const paramValidationPipe = new ZodValidationPipe(deleteListParamSchema);

@Controller('/lists/:id')
export class DeleteListController {
  constructor(private deleteListService: DeleteListService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param(paramValidationPipe) { id }: DeleteListParamSchema) {
    await this.deleteListService.execute({ id });
  }
}

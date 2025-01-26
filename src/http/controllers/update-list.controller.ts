import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UpdateListService } from '../../services/update-list.service';
import {
  UpdateListParamSchema,
  UpdateListBodySchema,
  updateListParamSchema,
  updateListBodySchema,
} from '../schemas/list-schemas';

const paramValidationPipe = new ZodValidationPipe(updateListParamSchema);
const bodyValidationPipe = new ZodValidationPipe(updateListBodySchema);

@Controller('/lists/:id')
export class UpdateListController {
  constructor(private updateListService: UpdateListService) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe) { id }: UpdateListParamSchema,
    @Body(bodyValidationPipe)
    { title }: UpdateListBodySchema,
  ) {
    const { list } = await this.updateListService.execute({
      id,
      title,
    });

    return list;
  }
}

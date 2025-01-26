import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CreateListService } from '../../services/create-list.service';
import {
  CreateListBodySchema,
  createListBodySchema,
} from '../schemas/list-schemas';

@Controller('/lists')
export class CreateListController {
  constructor(private createListService: CreateListService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createListBodySchema))
  async handle(
    @Body()
    { title }: CreateListBodySchema,
  ) {
    const { list } = await this.createListService.execute({
      title,
    });

    return list;
  }
}

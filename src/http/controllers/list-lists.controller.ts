import { Controller, Get, HttpCode } from '@nestjs/common';
import { ListListsService } from '../../services/list-lists.service';

@Controller('/lists')
export class ListListsController {
  constructor(private listListsService: ListListsService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const { lists } = await this.listListsService.execute();

    return lists;
  }
}

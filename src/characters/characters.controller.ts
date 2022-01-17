import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ICharacterFilter } from './interfaces';

@Controller('api/v1/characters')
export class CharactersController {
  public constructor(private charactersService: CharactersService) {}

  @Get('/')
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('characterName') characterName: string,
  ) {
    return await this.charactersService.getAll(page, limit, characterName);
  }

  @Post('/')
  async getAllByNames(@Body() characterFilter: ICharacterFilter) {
    return await this.charactersService.getAllByFilters(characterFilter);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Axios from 'axios';
import { ICharacterFilter, ICharacterResponse } from './interfaces';

@Injectable()
export class CharactersService {
  async getAll(page: number, limit: number, characterName: string) {
    try {
      const { data } = await Axios.get(
        `https://rickandmortyapi.com/api/character/`,
      );

      const characterResponse: ICharacterResponse = data;

      if (
        characterResponse &&
        characterResponse.results &&
        characterResponse.results.length
      ) {
        characterResponse.results = characterResponse.results.filter(
          (character) =>
            character.name.toLowerCase().includes(characterName.toLowerCase()),
        );

        characterResponse.info.count = characterResponse.results.length;
        characterResponse.info.pages = Math.ceil(
          characterResponse.results.length / limit,
        );

        characterResponse.results = characterResponse.results.slice(
          (page - 1) * limit,
          page * limit,
        );
      }

      return characterResponse;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllByFilters({ names }: ICharacterFilter) {
    try {
      const { data } = await Axios.get(
        `https://rickandmortyapi.com/api/character/`,
      );

      const characterResponse: ICharacterResponse = data;

      const finalCharacterResponse: ICharacterResponse = {
        info: characterResponse.info,
        results: [],
      };

      for (const name of names) {
        finalCharacterResponse.results = [
          ...finalCharacterResponse.results,
          ...characterResponse.results.filter((character) =>
            character.name.toLowerCase().includes(name.toLowerCase()),
          ),
        ];
      }

      return finalCharacterResponse;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}

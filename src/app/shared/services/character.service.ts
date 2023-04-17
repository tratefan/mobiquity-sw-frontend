import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  ICharacter,
  ICharacterResponse,
} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiPrefix = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getCharacterById(id: string): Observable<ICharacter> {
    return this.httpClient
      .get<ICharacterResponse>(`${this.apiPrefix}/people/${id}`)
      .pipe(map((movie) => this.mapData(movie)));
  }

  private mapData(character: ICharacterResponse): ICharacter {
    const matchMovieId = character.url.match(
      /https:\/\/swapi\.dev\/api\/people\/(\d+)\/$/
    );
    const characterId = matchMovieId ? matchMovieId[1] : null;

    return {
      id: characterId,
      name: character.name,
      height: character.height,
      mass: character.mass,
      hairColor: character.hair_color,
      skinColor: character.skin_color,
      eyeColor: character.eye_color,
      birthYear: character.birth_year,
      gender: character.gender,
      homeworld: character.homeworld,
      movies: character.films.map((filmUrl) => {
        const regex = /\/films\/(\d+)\//;
        const match = filmUrl.match(regex);
        return match ? match[1] : null;
      }),
      species: character.species,
      vehicles: character.vehicles,
      starships: character.starships,
      created: character.created,
      edited: character.edited,
      url: character.url,
    } as ICharacter;
  }
}

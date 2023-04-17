import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMovie, IMovieListResponse, IMovieResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiPrefix = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getMovies(): Observable<IMovie[]> {
    return this.httpClient
      .get<IMovieListResponse>(`${this.apiPrefix}/films`)
      .pipe(
        map((movies) => movies.results.map((movie) => this.mapData(movie)))
      );
  }

  public getMovieById(id: string): Observable<IMovie> {
    return this.httpClient
      .get<IMovieResponse>(`${this.apiPrefix}/films/${id}`)
      .pipe(map((movie) => this.mapData(movie)));
  }

  private mapData(movie: IMovieResponse): IMovie {
    const matchMovieId = movie.url.match(/\/films\/(\d+)\//);
    const movieId = matchMovieId ? matchMovieId[1] : null;

    return {
      id: movieId,
      title: movie.title,
      episodeId: movie.episode_id,
      openingCrawl: movie.opening_crawl,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.release_date,
      characters: movie.characters.map((characterUrl) => {
        const regex = /https:\/\/swapi\.dev\/api\/people\/(\d+)\/$/;
        const match = characterUrl.match(regex);
        return match ? match[1] : null;
      }),
      planets: movie.planets,
      starships: movie.starships,
      vehicles: movie.vehicles,
      species: movie.species,
      created: movie.created,
      edited: movie.edited,
      url: movie.url,
    } as IMovie;
  }
}

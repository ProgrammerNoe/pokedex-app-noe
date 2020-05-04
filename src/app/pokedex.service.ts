import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Pokemon} from './pokemon';

@Injectable()
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(offset: number, limit: number): Promise<Pokemon> {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(response => response['results'])
      .then(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;
        const image: string = this.baseSpriteUrl + id;
        return {
          name: item.name,
          id,
          sprite: image
        };
      }));
  }

}
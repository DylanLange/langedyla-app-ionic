import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Pokemon } from '../../data/models/pokemon';

/*
  Generated class for the PokemonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokemonServiceProvider {

	endpoint = 'https://pokeapi.co/api/v2/';

	constructor(public http: HttpClient) {
		this.http = http;
	}

	getPokemonByIdOrName(pokemonIdOrName: String): Promise<Pokemon> {
		console.log("in service: " + pokemonIdOrName);
		return new Promise(resolve => {
			this.http
				.get(this.endpoint + "pokemon/" + pokemonIdOrName)
				.subscribe((res: Pokemon) => {
					console.log(res);
					resolve(res);
				}, error => {
					console.log(error);
					resolve(error);
				});
		})
	}

	getFromEndpoint(endpoint: String) {
		console.log("GET from endpoint " + endpoint);
		return new Promise(resolve => {
			this.http
				.get(endpoint + "")
				.subscribe(res => {
					console.log(res);
					resolve(res);
				}, error => {
					console.log(error);
					resolve(error);
				});
		})
	}

}

import { HttpClient, HttpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import 'rxjs/add/operator/map'

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
		console.log('Hello PokemonServiceProvider Provider');
	}

	// getPokemon(id: String, callback: (Pokemon) => Void) {
	// 	return this.http
	// 		.get(endpoint + "pokemon/" + id)
	// 		.map(res => res.json().main)
	// 		.subscribe(res => {
	// 			console.log(res);
	// 			callback(res);
	// 		});
	// }

	getPokemon(pokemonId: String) {
		return new Promise(resolve => {
			this.http
				.get(this.endpoint + "pokemon/" + pokemonId)
				// .map(res => res.json)
				.subscribe(res => {
					console.log(res);
					resolve(res);
				}, error => {
					console.log(error);
				});
		})
	}

}

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

	getPokemonById(pokemonId: String) {
		return new Promise(resolve => {
			this.http
				.get(this.endpoint + "pokemon/" + pokemonId)
				.subscribe(res => {
					console.log(res);
					resolve(res);
				}, error => {
					console.log(error);
				});
		})
	}

}

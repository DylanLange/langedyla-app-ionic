import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { Pokemon } from '../../data/models/Pokemon';

/**
 * Generated class for the PokedexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokedex',
  templateUrl: 'pokedex.html',
})
export class PokedexPage {

  pokemonServiceProvider: PokemonServiceProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokemonServiceProvider: PokemonServiceProvider) {
    this.pokemonServiceProvider = pokemonServiceProvider;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PokedexPage');
    this.pokemonServiceProvider.getPokemon("100").then(
        data => {
          let pokemon = data as Pokemon;
          console.log("Received in pokedex: " + pokemon);
          console.log(pokemon.name);
        }
      )
  }

}

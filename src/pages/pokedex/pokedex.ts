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

  searchQuery: String = "";
  presenter: Presenter;
  pokemonServiceProvider: PokemonServiceProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokemonServiceProvider: PokemonServiceProvider) {
    this.pokemonServiceProvider = pokemonServiceProvider;
    this.presenter = new PokedexPresenter(this);
  }

  ionViewDidLoad() {
    this.pokemonServiceProvider.getPokemonById("100").then(
        pokemon => {
          console.log(pokemon.name);
        }
      )
  }

  onInput(event: any) {
    this.presenter.searchEntered(this.searchQuery);
  }

}

class PokedexPresenter implements Presenter {

  constructor(view: PokedexPage) {

  }

  searchEntered(query: String) {
    console.log(query);
  }

}

interface View {

}

interface Presenter {
  searchEntered(query: String);
}
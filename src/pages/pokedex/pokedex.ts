import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  loading: LoadingController;

  searchQuery: String = "";
  presenter: Presenter;
  loadingCtrl: LoadingController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokemonServiceProvider: PokemonServiceProvider, public loadingCtrl: LoadingController) {
    this.presenter = new PokedexPresenter(this, pokemonServiceProvider);

    this.loadingCtrl = loadingCtrl;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  search(event: any) {
    this.presenter.searchEntered(this.searchQuery);
  }

  showLoader() {
    this.loading.present();
  }

  hideLoader() {
    this.loading.dismiss();
  }

}

class PokedexPresenter implements Presenter {

  view: View;
  pokemonServiceProvider: PokemonServiceProvider;

  constructor(view: PokedexPage, public pokemonServiceProvider: PokemonServiceProvider) {
    this.view = view;
    this.pokemonServiceProvider = pokemonServiceProvider;
  }

  searchEntered(query: String) {
    console.log(query);
    this.view.showLoader();
    this.pokemonServiceProvider.getPokemonByIdOrName(query).then(
        pokemon => {
          this.view.hideLoader();
          console.log(pokemon.name);
        }
      )
  }

}

interface View {
  showLoader();
  hideLoader();
}

interface Presenter {
  searchEntered(query: String);
}
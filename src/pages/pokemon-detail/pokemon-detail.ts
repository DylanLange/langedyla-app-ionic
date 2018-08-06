import { Component } from '@angular/core';
import { Pokemon } from '../../data/models/pokemon';
import { Favourite } from '../../data/models/favourite';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { IonicPage, Loading, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the PokemonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
})
export class PokemonDetailPage implements View {

  loading: Loading;
  presenter: Presenter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokemonServiceProvider: PokemonServiceProvider,
    public loadingCtrl: LoadingController
  ) {
    this.presenter = new PokemonDetailPresenter(this, pokemonServiceProvider, navParams.data);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });//reinitialise because you can't reuse them apparently
    this.loading.present();
  }

  hideLoader() {
    this.loading.dismiss();
  }

  setFavouriteData(favourite: Favourite) {

  }

  setFullPokemonData(pokemon: Pokemon) {
    console.log(pokemon.stats);
  }

}

class PokemonDetailPresenter implements Presenter {

  constructor(
    public view: View,
    public pokemonServiceProvider: PokemonServiceProvider,
    public favourite: Favourite
  ) {
    view.setFavouriteData(favourite);
    view.showLoader();
    pokemonServiceProvider.getPokemonByIdOrName("" + favourite.id)
      .then((pokemon) => {
        view.hideLoader();
        if (pokemon !== undefined) {
          view.setFullPokemonData(pokemon);
        } else {
          //maybe show some error
        }
      });
  }

}

interface View {
  showLoader();
  hideLoader();
  setFavouriteData(favourite: Favourite);
  setFullPokemonData(pokemon: Pokemon);
}

interface Presenter {


}

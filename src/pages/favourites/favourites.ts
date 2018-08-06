import { Component } from '@angular/core';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { Pokemon } from '../../data/models/pokemon';
import { PokemonDetailPage } from '../pokemon-detail/pokemon-detail';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Favourite } from '../../data/models/favourite';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage implements View {

  favourites: Favourite[] = [];
  presenter: Presenter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myDataProvider: MyDataProvider
  ) {
    this.presenter = new FavouritesPresenter(this, myDataProvider); 
  }

  ionViewDidEnter() {
    this.presenter.viewDidEnter(); 
  }

  setFavouritesData(favourites: Favourite[]) {
    this.favourites = favourites;
  }

  goToPokemonDetail(favourite: Favourite) {
    this.navCtrl.push(PokemonDetailPage, favourite);
  }

  favouriteClicked(favourite: Favourite){
    this.presenter.favouriteClicked(favourite);
  }

}

export class FavouritesPresenter implements Presenter {

  constructor(
    public view: View,
    public myDataProvider: MyDataProvider
  ) {
    this.view = view;
    this.myDataProvider = myDataProvider;
  }

  viewDidEnter() {
    this.myDataProvider.getFavourites()
      .then((favourites) => {
        this.view.setFavouritesData(favourites);
      });
  }

  favouriteClicked(favourite: Favourite) {
    this.view.goToPokemonDetail(favourite);
  }

}

interface View {
  setFavouritesData(favourites: Favourite[]);
  goToPokemonDetail(favourite: Favourite);
}

interface Presenter {
  viewDidEnter();
  favouriteClicked(favourite: Favourite);
}

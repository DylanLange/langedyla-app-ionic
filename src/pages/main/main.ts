import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokedexPage } from '../pokedex/pokedex';
import { FavouritesPage } from '../favourites/favourites';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage implements View {

	presenter = MainPresenter(this);

  pokedexRoot = PokedexPage;
  favouritesRoot = FavouritesPage;
  accountRoot = AccountPage;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {

  }

  ionViewWillUnload() {
  	
  }

}


class MainPresenter implements Presenter{

	constructor(view: MainPage) {

	}

}

interface View {

}

interface Presenter {
	
}
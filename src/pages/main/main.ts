import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokedexPage } from '../pokedex/pokedex';
import { FavouritesPage } from '../favourites/favourites';
import { AccountPage } from '../account/account';

/**
 * Generated class for the MainPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  pokedexRoot = PokedexPage;
  favouritesRoot = FavouritesPage;
  accountRoot = AccountPage;


  constructor(public navCtrl: NavController) {}

}

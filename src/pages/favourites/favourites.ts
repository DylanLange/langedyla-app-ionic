import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { MyDataProvider } from '../../providers/my-data/my-data';
import Favourite from '../../data/models/favourite';

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
export class FavouritesPage {

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

}

class FavouritesPresenter implements Presenter {

  view: View;
  myDataProvider: MyDataProvider;

  constructor(
    view: View,
    myDataProvider: MyDataProvider
  ) {
    this.view = view;
    this.myDataProvider = myDataProvider;
  }

  viewDidEnter() {
    this.myDataProvider.getFavourites()
      .then((favourites) => {
        console.log("loaded favourites in other tab");
        console.log(favourites);
        this.view.setFavouritesData(favourites);
      });
  }

}

interface View {
  setFavouritesData(favourites: Favourite[]);
}

interface Presenter {
  viewDidEnter();
}

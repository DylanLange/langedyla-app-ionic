import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  presenter: FavouritesPresenter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myDataProvider: MyDataProvider
  ) {
    this.presenter = new FavouritesPresenter(myDataProvider);
  }

  ionViewDidEnter() {
    this.presenter.viewDidEnter();
  }

}

class FavouritesPresenter implements Presenter {

  myDataProvider: MyDataProvider;

  constructor(
    myDataProvider: MyDataProvider
  ) {
    this.myDataProvider = myDataProvider;
  }

  viewDidEnter() {
    this.myDataProvider.getFavourites()
      .then((favourites) => {
        console.log("loaded favourites in other tab");
        console.log(favourites);
      });
  }

}

interface View {

}

interface Presenter {
  viewDidEnter();
}

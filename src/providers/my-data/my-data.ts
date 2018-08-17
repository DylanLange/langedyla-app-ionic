import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/fromPromise';
import { Favourite } from '../../data/models/favourite';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the MyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDataProvider {

  constructor(private storage: Storage, private auth: AngularFireAuth) {
    
  }

  getCurrentUserStorageKey(): string {
    return "1jh21" + this.auth.auth.currentUser.email
  }

  getFavourites() : Promise<Favourite[]> {
    return Observable.fromPromise(this.storage.get(this.getCurrentUserStorageKey()))
      .map((favouritesJson) => {
        var result = JSON.parse(favouritesJson);
        if(result == null) result = [];
        else if(result.constructor !== Array) {
          result = [result];
        }
        return result;
      })
      .toPromise();
  }

  setFavourites(favourites: Favourite[]) {
    this.storage.set(this.getCurrentUserStorageKey(), JSON.stringify(favourites));
  }

  addToFavourites(newFavourite: Favourite): Promise<Boolean> {
    return Observable.fromPromise(this.getFavourites())
      .map((favourites) => {
        this.setFavourites(favourites.concat([newFavourite]))
        return true;
      })
      .toPromise()
  }

  removeFavouriteById(id: Number) {
    return Observable.fromPromise(this.getFavourites())
      .map((favourites) => {
        var newFavourites: Favourite[] = favourites.filter((favourite) => favourite.id != id);
        this.setFavourites(newFavourites);
        return true;
      })
      .toPromise()
  }

}

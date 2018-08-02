import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Favourite } from '../../data/models/favourite';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/fromPromise';

/*
  Generated class for the MyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDataProvider {

  favouritesStorageKey: string = "_1adwa3"

  constructor(public storage: Storage) {
    this.storage = storage;
  }

  getFavourites() : Promise<Favourite[]> {
    return Observable.fromPromise(this.storage.get(this.favouritesStorageKey))
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
    this.storage.set(this.favouritesStorageKey, JSON.stringify(favourites));
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
        var newFavourites = favourites.filter((favourite) => favourite.id != id);
        if(newFavourites.constructor !== Array) newFavourites = [newFavourites];
        this.setFavourites(newFavourites);
        return true;
      })
      .toPromise()
  }

}

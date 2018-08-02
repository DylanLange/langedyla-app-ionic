import { Injectable } from '@angular/core';

/*
  Generated class for the MyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyDataProvider {

  favouritesStorageKey: string = "favourites"

  constructor() {
    
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { PokedexPage } from '../pages/pokedex/pokedex';
import { FavouritesPage } from '../pages/favourites/favourites';
import { AccountPage } from '../pages/account/account';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    PokedexPage,
    FavouritesPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    PokedexPage,
    FavouritesPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http'; 

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { PokedexPage } from '../pages/pokedex/pokedex';
import { FavouritesPage } from '../pages/favourites/favourites';
import { AccountPage } from '../pages/account/account';
import { PokemonServiceProvider } from '../providers/pokemon-service/pokemon-service';
import { MyDataProvider } from '../providers/my-data/my-data';
import { PokemonDetailPage } from '../pages/pokemon-detail/pokemon-detail';
import { SplashPage } from '../pages/splash/splash';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    PokedexPage,
    FavouritesPage,
    AccountPage,
    PokemonDetailPage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    PokedexPage,
    FavouritesPage,
    AccountPage,
    PokemonDetailPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    PokemonServiceProvider,
    MyDataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

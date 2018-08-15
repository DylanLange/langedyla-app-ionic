import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http'; 

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { PokedexPage } from '../pages/pokedex/pokedex';
import { FavouritesPage } from '../pages/favourites/favourites';
import { AccountPage } from '../pages/account/account';
import { PokemonServiceProvider } from '../providers/pokemon-service';
import { MyDataProvider } from '../providers/my-data/my-data';
import { PokemonDetailPage } from '../pages/pokemon-detail/pokemon-detail';
import { SplashPage } from '../pages/splash/splash';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { SignUpPage } from '../pages/sign-up/sign-up';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    PokedexPage,
    FavouritesPage,
    AccountPage,
    PokemonDetailPage,
    LoginPage,
    SignUpPage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxErrorsModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
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
    LoginPage,
    SignUpPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    PokemonServiceProvider,
    MyDataProvider,
    AngularFireAuth,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { delay } from '../../utils/utils';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage implements View {

  presenter: Presenter;

  constructor(
    private navCtrl: NavController, 
    auth: AuthService
  ) {
    this.presenter = new SplashPresenter(this, auth);
  }

  goToMain() {
    this.navCtrl.setRoot(MainPage);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    this.presenter.viewLoaded();
  }

}

export class SplashPresenter implements Presenter {

  constructor(
    private view: View,
    private auth: AuthService
  ) {

  }

  viewLoaded() {
    delay(1500)
      .then(() => {
        if(this.auth.isSignedIn()) {
          this.view.goToMain();
        } else {
          this.view.goToLogin();
        }
      });
  }

}

interface View {
  goToMain();
  goToLogin();
}

interface Presenter {
  viewLoaded();
}

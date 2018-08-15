import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements View {

  loading: Loading;

  presenter: Presenter;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private auth: AuthService,
    private app: App,
    private loadingCtrl: LoadingController
  ) {
    this.presenter = new AccountPresenter(this, auth);
  }

  goToLogin() {
    this.app.getRootNav().setRoot(LoginPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });//reinitialise because you can't reuse them apparently
    this.loading.present();
  }

  hideLoader() {
    this.loading.dismiss();
  }

  logout() {
    this.presenter.logoutClicked();
  }

}

export class AccountPresenter implements Presenter {

  constructor(
    private view: View,
    private auth: AuthService
  ) {

  }

  logoutClicked() {
    this.view.showLoader();
    this.auth.signOut()
      .then(
        () => {
          this.view.hideLoader();
          this.view.goToLogin();
        },
        error => {
          this.view.hideLoader();
          //TODO: show error
        }
      );
  }

}

interface View {
  showLoader();
  hideLoader();
  goToLogin();
}

interface Presenter {
  logoutClicked();
}

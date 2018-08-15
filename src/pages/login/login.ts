import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainPage } from '../main/main';
import { AuthService } from '../../providers/auth-service';
import { SignUpPage } from '../sign-up/sign-up';
import { Credentials } from '../../data/models/credentials';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements View {

  loginForm: FormGroup;
  loginError: String;
  loading: Loading;

  presenter: Presenter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    auth: AuthService,
    fb: FormBuilder
  ) {
    this.presenter = new LoginPresenter(this, auth);

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  goToMain() {
    this.navCtrl.setRoot(MainPage);
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  setLoginError(error: String) {
    this.loginError = error;
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

  login() {
    let data = this.loginForm.value;
    if (!data.email) {
      return;
    }
    let credentials = new Credentials(data.email, data.password);

    this.presenter.loginClicked(credentials);
  }

  signup(){
    this.presenter.signUpClicked();
  }

}

export class LoginPresenter implements Presenter {

  constructor(
    private view: View,
    private auth: AuthService
  ) {

  }

  signUpClicked() {
    this.view.goToSignUp();
  }

  loginClicked(credentials: Credentials) {
    this.view.showLoader();
    this.auth.signInWithEmail(credentials)
      .then(
        () => {
          this.view.hideLoader();
          this.view.goToMain();
        },
        error => {
          this.view.hideLoader();
          this.view.setLoginError(error.message);
        }
      );
  }

}

interface View {
  goToMain();
  goToSignUp();
  showLoader();
  hideLoader();
  setLoginError(error: String);
}

interface Presenter {
  loginClicked(credentials: Credentials);
  signUpClicked();
}

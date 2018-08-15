import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { MainPage } from '../main/main';
import { Credentials } from '../../data/models/credentials';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements View {

  signUpError: String;
  form: FormGroup;
  loading: Loading;
  
  presenter: Presenter;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    auth: AuthService,
    fb: FormBuilder
  ) {
    this.presenter = new SignUpPresenter(this, auth);

    this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  goToMain() {
    this.navCtrl.setRoot(MainPage);
  }

  setSignUpError(error: String) {
    this.signUpError = error;
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

  signup() {
    let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.presenter.signUpClicked(credentials);
  }

}

export class SignUpPresenter implements Presenter{

  constructor(
    private view: View,
    private auth: AuthService
  ) {

  }

  signUpClicked(credentials: Credentials) {
    this.view.showLoader();
    this.auth.signUp(credentials).then(
			() => {
        this.view.hideLoader();
        this.view.goToMain();
      },
			error => {
        this.view.hideLoader();
        this.view.setSignUpError(error.message);
      }
		);
  }

}

interface View {
  showLoader();
  hideLoader();
  goToMain();
  setSignUpError(error: String)
}

interface Presenter {
  signUpClicked(credentials: Credentials);
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { Credentials } from '../data/models/credentials';

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials: Credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email + "", credentials.password + "");
	}

	signUp(credentials: Credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email + "", credentials.password + "");
	}

	isSignedIn(): Boolean {
		return this.user !== null;
	}
	
	getUserEmail(): String {
		return this.user && this.user.email;
	}

}
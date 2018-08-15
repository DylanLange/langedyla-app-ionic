import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { Credentials } from '../data/models/credentials';

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(private afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithEmail(credentials: Credentials) {
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

	signInWithGoogle() {
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

}
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private fireAuth: AngularFireAuth, private router: Router) {}

    loginWithGoogle(): Observable<firebase.auth.UserCredential> {
        return from(this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
    }

    loginAsGuest(): Observable<firebase.auth.UserCredential> {
        return from(this.fireAuth.signInAnonymously());
    }

    signOut(): Observable<void> {
        return from(this.fireAuth.signOut());
    }
}

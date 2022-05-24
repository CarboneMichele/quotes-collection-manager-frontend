import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public userIdSource = new BehaviorSubject<string | null>(null);
    public updatedUserId$ = this.userIdSource.asObservable();

    constructor(private fireAuth: AngularFireAuth) {
        this.fireAuth.authState.subscribe((user: firebase.User | null) => {
            this.emitUserId(user);
        });
    }

    loginWithGoogle(): Observable<firebase.auth.UserCredential> {
        return from(this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
    }

    emitUserId(user: firebase.User | null): void {
        this.userIdSource.next(user ? user!.uid : null);
    }

    signOut(): Observable<void> {
        return from(this.fireAuth.signOut());
    }
}

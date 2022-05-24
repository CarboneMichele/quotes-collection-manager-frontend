import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserResolver implements Resolve<string | null> {
    private authState = this.fireAuth.authState as Observable<User | null>;

    constructor(private fireAuth: AngularFireAuth) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | null> {
        return this.authState.pipe(
            take(1),
            map((uid: User | null) => {
                return uid?.uid;
            })
        ) as Observable<string | null>;
    }
}

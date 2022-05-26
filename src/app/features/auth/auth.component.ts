import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorsService } from './../../core/services/errors.service';
import { NotificationsService } from './../../core/services/notifications.service';
import { AuthService } from './../../core/services/auth.service';

import { Constants } from 'src/app/core/constants/constants';

@Component({
    selector: 'qcm-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    private authSubscribeHandler = {
        next: (): void => {
            this.redirectToQuotesRoute();
        },
        error: (err: HttpErrorResponse): void => {
            this.errorsService.handleError(err, Constants.ERROR_SUGGESTED_QUOTE_FETCH);
        },
    };

    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationsService: NotificationsService,
        private errorsService: ErrorsService
    ) {}

    //
    // ─── SIGN IN METHODS ────────────────────────────────────────────────────────────
    //

    loginWithGoogle(): void {
        this.authService.loginWithGoogle().subscribe(this.authSubscribeHandler);
    }

    redirectToQuotesRoute(): void {
        this.notificationsService.openSnackBar(Constants.SUCCESS_LOGIN, undefined, false);
        this.router.navigate(['']);
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from './../../core/services/notifications.service';
import { AuthService } from './../../core/services/auth.service';

@Component({
    selector: 'qcm-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    constructor(private authService: AuthService, private router: Router, private notificationsService: NotificationsService) {}

    loginWithGoogle(): void {
        this.authService.loginWithGoogle().subscribe(() => {
            this.redirectToQuotesRoute();
        });
    }

    loginAsGuest(): void {
        this.authService.loginAsGuest().subscribe(() => {
            this.redirectToQuotesRoute();
        });
    }

    redirectToQuotesRoute(): void {
        this.notificationsService.openSnackBar('Successfully logged in', undefined, false);
        this.router.navigate(['']);
    }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string = 'Close', isError: boolean): void {
        const panelClass = isError ? 'error-snackbar' : 'success-snackbar';
        this.snackBar.open(message, action, {
            panelClass: panelClass,
        });
    }
}

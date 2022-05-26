import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorsService {
    constructor(private notificationsService: NotificationsService) {}

    public handleError(error: HttpErrorResponse, errorMessage: string): void {
        this.notifyError(errorMessage);
        throw error;
    }

    private notifyError(errorMessage: string): void {
        this.notificationsService.openSnackBar(errorMessage, undefined, true);
    }
}

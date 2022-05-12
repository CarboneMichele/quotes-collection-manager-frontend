import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClipboardService {
    public copiedToClipboardSource = new Subject<boolean>();
    public updatedCopiedToClipboardSource$ = this.copiedToClipboardSource.asObservable();

    constructor(private clipboard: Clipboard, private notificationsService: NotificationsService) {}

    copy(stringToCopy: string): void {
        this.clipboard.copy(stringToCopy);
        this.copiedToClipboardSource.next(true);
    }
}

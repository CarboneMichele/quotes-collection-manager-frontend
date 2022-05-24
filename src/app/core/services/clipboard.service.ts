import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
    providedIn: 'root',
})
export class ClipboardService {
    public copiedToClipboardSource = new Subject<boolean>();
    public updatedCopiedToClipboardSource$ = this.copiedToClipboardSource.asObservable();

    constructor(private clipboard: Clipboard) {}

    copy(stringToCopy: string): void {
        this.clipboard.copy(stringToCopy);
        this.copiedToClipboardSource.next(true);
    }
}

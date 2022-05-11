import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    public shouldShowCreatorFormSource = new BehaviorSubject<boolean>(false);
    public updatedShouldShowCreatorFormSource$: Observable<boolean> = this.shouldShowCreatorFormSource.asObservable();
    constructor() {}

    showCreatorForm(): void {
        this.shouldShowCreatorFormSource.next(true);
    }

    hideCreatorForm(): void {
        this.shouldShowCreatorFormSource.next(false);
    }
}

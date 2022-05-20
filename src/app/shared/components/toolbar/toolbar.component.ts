import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './../../../core/services/layout.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'qcm-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    public searchText = '';

    @Output() textSearched = new EventEmitter<string>();

    constructor(private layoutService: LayoutService, private authService: AuthService, private router: Router) {}

    //
    // ─── TEXT SEARCH METHODS ────────────────────────────────────────────────────────
    //

    emitQuoteCreationEvent(): void {
        this.textSearched.emit(this.searchText);
    }

    //
    // ─── LAYOUT METHODS ─────────────────────────────────────────────────────────────
    //

    showQuoteCreatorForm(): void {
        this.layoutService.showCreatorForm();
    }
}

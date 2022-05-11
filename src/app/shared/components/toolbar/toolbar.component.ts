import { LayoutService } from './../../../core/services/layout.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'qcm-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    public searchText = '';

    @Output() textSearched = new EventEmitter<string>();

    constructor(private layoutService: LayoutService) {}

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

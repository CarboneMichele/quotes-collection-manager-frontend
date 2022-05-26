import { Component, Input, EventEmitter, Output } from '@angular/core';

import { QuoteParams, SuggestedQuote } from '../../models/quotes.model';

@Component({
    selector: 'qcm-suggested-quote',
    templateUrl: './suggested-quote.component.html',
    styleUrls: ['./suggested-quote.component.scss'],
})
export class SuggestedQuoteComponent {
    public hidden = false;
    @Input() quote!: SuggestedQuote;
    @Output() quoteSaved = new EventEmitter<QuoteParams>();

    constructor() {}

    //
    // ─── QUOTE SAVING METHODS ───────────────────────────────────────────────────────
    //

    saveQuote(): void {
        const author = this.quote?.author ? this.quote?.author.trim() : '';
        this.quoteSaved.emit({ content: this.quote?.text.trim(), author: author });
        this.hide();
    }

    //
    // ─── LAYOUT METHODS ─────────────────────────────────────────────────────────────
    //

    hide(): void {
        this.hidden = true;
    }
}

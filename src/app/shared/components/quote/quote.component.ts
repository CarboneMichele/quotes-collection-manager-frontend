import { Component, Input } from '@angular/core';
import { UtilsService } from './../../../core/services/utils.service';
import { ClipboardService } from './../../../core/services/clipboard.service';
import { Quote } from '../../models/quotes.model';

@Component({
    selector: 'qcm-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
    @Input() quote!: Quote;
    @Input() searchTerms!: string[];
    constructor(private clipboardService: ClipboardService, private utilsService: UtilsService) {}

    //
    // ─── CLIPBOARD METHODS ──────────────────────────────────────────────────────────
    //

    copyToClipboard(): void {
        const author = this.quote.author ? this.quote.author : 'Anonymous';
        const stringToCopy = `${this.formatQuoteContent(this.quote.content)}\n(${author})`;
        this.clipboardService.copy(stringToCopy);
    }

    //
    // ─── UTILS METHODS ──────────────────────────────────────────────────────────────
    //

    formatQuoteContent(quoteContent: string): string {
        const capitalizedQuote = quoteContent.charAt(0).toUpperCase() + quoteContent.slice(1);
        return capitalizedQuote.endsWith('.') ? capitalizedQuote : capitalizedQuote + '.';
    }
}

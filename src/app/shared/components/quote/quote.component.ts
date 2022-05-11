import { ClipboardService } from './../../../core/services/clipboard.service';
import { Component, Input } from '@angular/core';
import { Quote } from '../../models/quotes.model';

@Component({
    selector: 'qcm-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
    @Input() quote!: Quote;
    constructor(private clipboardService: ClipboardService) {}
}

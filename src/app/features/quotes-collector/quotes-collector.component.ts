import { ClipboardService } from './../../core/services/clipboard.service';
import { UtilsService } from './../../core/services/utils.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { NotificationsService } from './../../core/services/notifications.service';
import { QuotesService } from './../../core/services/quotes.service';

import { QuoteParams } from './../../shared/models/quotes.model';
import { Quote, RandomQuote } from 'src/app/shared/models/quotes.model';

@Component({
    selector: 'qcm-quotes-collector',
    templateUrl: './quotes-collector.component.html',
    styleUrls: ['./quotes-collector.component.scss'],
})
export class QuotesCollectorComponent implements OnInit, OnDestroy {
    public quotes!: Quote[];
    public randomQuote!: RandomQuote;
    public searchText: string[] = [];

    //
    // ─── OBSERVABLES - SUBSCRIPTIONS VARIABLES ──────────────────────────────────────────────────
    //

    public quotesListSubscription!: Subscription;
    public clipboardCopySubscription!: Subscription;

    constructor(
        private quotesService: QuotesService,
        private notificationsService: NotificationsService,
        private utilsService: UtilsService,
        private clipboardService: ClipboardService
    ) {}

    ngOnInit(): void {
        this.subscribeToQuoteListSource();
        this.subscribeToClipboardCopySource();
        this.getQuotes();
        this.getRandomQuote();
    }

    //
    // ─── OBSERVABLE - SUBSCRIPTIONS METHODS ─────────────────────────────────────────────────────────────
    //

    subscribeToQuoteListSource(): void {
        this.quotesListSubscription = this.quotesService.updatedQuotesListSource$.subscribe((quotes: Quote[]) => {
            this.quotes = quotes;
        });
    }

    subscribeToClipboardCopySource(): void {
        this.clipboardCopySubscription = this.clipboardService.updatedCopiedToClipboardSource$.subscribe((copied: boolean) => {
            if (copied) {
                this.notificationsService.openSnackBar('Copied to clipboard', undefined, false);
            }
        });
    }

    //
    // ─── QUOTES METHODS ─────────────────────────────────────────────────────────────
    //

    getQuotes(): void {
        this.quotesService.getQuotes().subscribe({
            next: (quotes: Quote[]) => {
                this.updateQuotesList(quotes);
            },
            error: () => {
                this.notificationsService.openSnackBar('An error occurred while fetching quotes', undefined, true);
            },
        });
    }

    storeNewQuote(params: QuoteParams): void {
        this.quotesService.createNewQuote(params).subscribe({
            error: () => {
                this.notificationsService.openSnackBar('An error occurred while storing the new quote', undefined, true);
            },
        });
    }

    updateQuotesList(quotes: Quote[]): void {
        this.quotesService.updateQuotesList(
            quotes.sort((quoteA: Quote, quoteB: Quote) => {
                return quoteB.created_at.seconds - quoteA.created_at.seconds;
            })
        );
    }

    //
    // ─── RANDOM QUOTE METHODS ───────────────────────────────────────────────────────
    //

    getRandomQuote(): void {
        this.quotesService.getRandomQuote().subscribe({
            next: (randomQuote: RandomQuote) => {
                this.randomQuote = randomQuote;
            },
            error: (err: any) => {
                this.notificationsService.openSnackBar('An error occurred while fetching the suggested quote', undefined, true);
            },
        });
    }

    //
    // ─── TEXT SEARCH METHODS ────────────────────────────────────────────────────────
    //

    updateSearchText(searchText: string): void {
        this.searchText = this.utilsService.getArrayOfOnlyAlphanumericStrings(searchText);
    }

    //
    // ─── ON DESTROY ─────────────────────────────────────────────────────────────────
    //

    ngOnDestroy(): void {
        this.quotesListSubscription.unsubscribe();
    }
}

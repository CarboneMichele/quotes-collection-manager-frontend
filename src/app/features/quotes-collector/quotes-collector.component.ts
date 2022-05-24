import { ErrorsService } from './../../core/services/errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ClipboardService } from './../../core/services/clipboard.service';
import { UtilsService } from './../../core/services/utils.service';
import { NotificationsService } from './../../core/services/notifications.service';
import { QuotesService } from './../../core/services/quotes.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { QuoteParams } from './../../shared/models/quotes.model';
import { Quote, SuggestedQuote } from 'src/app/shared/models/quotes.model';
import { Constants } from 'src/app/core/constants/constants';

@Component({
    selector: 'qcm-quotes-collector',
    templateUrl: './quotes-collector.component.html',
    styleUrls: ['./quotes-collector.component.scss'],
})
export class QuotesCollectorComponent implements OnInit, OnDestroy {
    public quotes: Quote[] = [];
    public suggestedQuote!: SuggestedQuote;
    public searchText: string[] = [];

    //
    // ─── OBSERVABLES - SUBSCRIPTIONS VARIABLES ──────────────────────────────────────────────────
    //

    public quotesListSubscription!: Subscription;
    public quotesCollectionSubscription!: Subscription;
    public clipboardCopySubscription!: Subscription;

    private uid!: string;

    constructor(
        private quotesService: QuotesService,
        private notificationsService: NotificationsService,
        private utilsService: UtilsService,
        private clipboardService: ClipboardService,
        private authService: AuthService,
        private router: Router,
        private errorsService: ErrorsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscribeToQuoteListSource();
        this.subscribeToClipboardCopySource();
        this.subscribeToUidSource();
        this.getSuggestedQuote();
    }

    //
    // ─── OBSERVABLE - SUBSCRIPTIONS METHODS ─────────────────────────────────────────────────────────────
    //

    subscribeToUidSource(): void {
        this.activatedRoute.data.subscribe((data: Data | null) => {
            if (data !== null && data !== undefined) {
                this.uid = data['uid'];
                this.getQuotes(this.uid);
            }
        });
    }

    subscribeToQuoteListSource(): void {
        this.quotesListSubscription = this.quotesService.updatedQuotesListSource$.subscribe((quotes: Quote[]) => {
            this.quotes = quotes;
        });
    }

    subscribeToClipboardCopySource(): void {
        this.clipboardCopySubscription = this.clipboardService.updatedCopiedToClipboardSource$.subscribe((copied: boolean) => {
            if (copied) {
                this.notificationsService.openSnackBar(Constants.SUCCESS_CLIPBOARD, undefined, false);
            }
        });
    }

    //
    // ─── QUOTES METHODS ─────────────────────────────────────────────────────────────
    //

    getQuotes(uid: string | null): void {
        this.quotesCollectionSubscription = this.quotesService.getQuotes(uid).subscribe({
            next: (quotes: Quote[]) => {
                this.updateQuotesList(quotes);
            },
            error: (err: HttpErrorResponse) => {
                this.errorsService.handleError(err, Constants.ERROR_QUOTES_FETCH);
            },
        });
    }

    storeNewQuote(params: QuoteParams): void {
        const newQuote = { ...params, owner: this.uid };
        this.quotesService.createNewQuote(newQuote).subscribe({
            next: () => {
                this.notificationsService.openSnackBar(Constants.SUCCESS_QUOTE_STORE, undefined, false);
            },
            error: (err: HttpErrorResponse) => {
                this.errorsService.handleError(err, Constants.ERROR_QUOTE_STORE);
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

    getSuggestedQuote(): void {
        this.quotesService.getSuggestedQuote().subscribe({
            next: (suggestedQuote: SuggestedQuote) => {
                this.suggestedQuote = suggestedQuote;
            },
            error: (err: HttpErrorResponse) => {
                this.errorsService.handleError(err, Constants.ERROR_SUGGESTED_QUOTE_FETCH);
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
    // ─── AUTH METHODS ───────────────────────────────────────────────────────────────
    //

    signOut(): void {
        this.authService.signOut().subscribe(() => {
            this.notificationsService.openSnackBar(Constants.SUCCESS_LOGOUT, undefined, false);
            this.router.navigate(['sign-in']);
        });
    }

    //
    // ─── ON DESTROY ─────────────────────────────────────────────────────────────────
    //

    ngOnDestroy(): void {
        if (this.quotesCollectionSubscription) {
            this.quotesCollectionSubscription.unsubscribe();
        }
        if (this.quotesListSubscription) {
            this.quotesListSubscription.unsubscribe();
        }
        if (this.clipboardCopySubscription) {
            this.clipboardCopySubscription.unsubscribe();
        }
    }
}

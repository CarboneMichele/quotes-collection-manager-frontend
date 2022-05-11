import { from, map, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { addDoc, collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';

import { Quote, QuoteParams } from './../../shared/models/quotes.model';
import { RandomQuote } from 'src/app/shared/models/quotes.model';

@Injectable({
    providedIn: 'root',
})
export class QuotesService {
    public firestoreQuotesCollection = collection(this.firestore, 'quotes');

    public quotesListSource = new Subject<Quote[]>();
    public updatedQuotesListSource$: Observable<Quote[]> = this.quotesListSource.asObservable();

    public newQuoteSource = new Subject<QuoteParams>();
    public updatedNewQuoteSource$: Observable<QuoteParams> = this.newQuoteSource.asObservable();

    constructor(private httpClient: HttpClient, private firestore: Firestore) {}

    //
    // ─── GET REQUESTS ───────────────────────────────────────────────────────────────
    //

    getQuotes(): Observable<Quote[]> {
        return collectionData(this.firestoreQuotesCollection, { idField: 'id' }) as Observable<Quote[]>;
    }

    getRandomQuote(): Observable<RandomQuote> {
        return this.httpClient.get<RandomQuote[]>('https://type.fit/api/quotes').pipe(
            map((quotes: RandomQuote[]) => {
                return quotes[Math.floor(Math.random() * quotes.length)];
            })
        );
    }

    //
    // ─── POST REQUESTS ──────────────────────────────────────────────────────────────
    //

    createNewQuote(quote: QuoteParams): Observable<DocumentData> {
        const params = { ...quote, created_at: new Date() };
        return from(addDoc(this.firestoreQuotesCollection, params));
    }

    //
    // ─── PATCH REQUESTS ─────────────────────────────────────────────────────────────
    //

    //
    // ─── CLIPBOARD METHODS ──────────────────────────────────────────────────────────
    //

    copyToClipboard(quote: Quote): void {}

    //
    // ─── SUBSCRIPTIONS - SUBJECTS METHODS ──────────────────────────────────────────────────────
    //

    updateQuotesList(quotes: Quote[]): void {
        this.quotesListSource.next(quotes);
    }

    updateNewQuoteSource(params: QuoteParams): void {
        this.newQuoteSource.next(params);
    }
}

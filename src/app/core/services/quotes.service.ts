import { from, map, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DocumentData } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/compat/firestore';

import { Quote, QuoteParams } from './../../shared/models/quotes.model';
import { SuggestedQuote } from 'src/app/shared/models/quotes.model';

@Injectable({
    providedIn: 'root',
})
export class QuotesService {
    public firestoreQuotesCollection = this.firestore.collection(`/quotes`);
    public firestoreUserQuotesCollection!: AngularFirestoreCollection<DocumentData>;

    public newQuoteSource = new Subject<QuoteParams>();
    public updatedNewQuoteSource$: Observable<QuoteParams> = this.newQuoteSource.asObservable();

    constructor(private httpClient: HttpClient, private firestore: AngularFirestore) {}

    //
    // ─── GET REQUESTS ───────────────────────────────────────────────────────────────
    //

    getQuotes(uid: string | null): any {
        return this.firestore
            .collection('/quotes', (ref: CollectionReference<DocumentData>) => ref.where('owner', '==', uid))
            .valueChanges() as Observable<Quote[]>;
    }

    getSuggestedQuote(): Observable<SuggestedQuote> {
        return this.httpClient.get<SuggestedQuote[]>('https://type.fit/api/quotes').pipe(
            map((quotes: SuggestedQuote[]) => {
                return quotes[Math.floor(Math.random() * quotes.length)];
            })
        );
    }

    //
    // ─── POST REQUESTS ──────────────────────────────────────────────────────────────
    //

    createNewQuote(quote: QuoteParams): Observable<unknown> {
        const params = { ...quote, created_at: new Date() };
        return from(this.firestoreQuotesCollection.add(params));
    }
}

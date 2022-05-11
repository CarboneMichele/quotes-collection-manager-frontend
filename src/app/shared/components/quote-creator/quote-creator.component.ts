import { LayoutService } from './../../../core/services/layout.service';
import { QuoteParams } from './../../models/quotes.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilsService } from './../../../core/services/utils.service';
import { QuotesService } from './../../../core/services/quotes.service';

import { NoWhitespaceValidator } from '../../validators/no-whitespace.validator';
import { NoDuplicatesValidator } from '../../validators/no-duplicates.validator';

import { Constants } from 'src/app/core/constants/constants';
import { Quote } from '../../models/quotes.model';

@Component({
    selector: 'qcm-quote-creator',
    templateUrl: './quote-creator.component.html',
    styleUrls: ['./quote-creator.component.scss'],
})
export class QuoteCreatorComponent implements OnInit, OnDestroy {
    public constants = Constants;
    public quoteCreationForm!: FormGroup;
    public showQuoteCreator = false;

    private quotesSubscription!: Subscription;
    private quotesContents: string[] = [];

    @Output() quoteCreated = new EventEmitter<QuoteParams>();

    constructor(
        private formBuilder: FormBuilder,
        private quotesService: QuotesService,
        private cd: ChangeDetectorRef,
        private utilsService: UtilsService,
        private layoutService: LayoutService
    ) {}

    get quoteControl(): AbstractControl | null {
        return this.quoteCreationForm.get('quote');
    }

    get authorControl(): AbstractControl | null {
        return this.quoteCreationForm.get('author');
    }

    //
    // ─── LIFECYCLE METHODS ──────────────────────────────────────────────────────────
    //

    ngOnInit(): void {
        this.createForm();
        this.subscribeToQuotesList();
        this.subscribeToShowVariable();
    }

    emitQuoteCreationEvent(): void {
        this.quoteCreated.emit({ content: this.quoteControl?.value.trim(), author: this.authorControl?.value.trim() });
    }

    //
    // ─── SUBSCRIPTIONS METHODS ───────────────────────────────────────────────────────────────
    //

    subscribeToShowVariable(): void {
        this.layoutService.updatedShouldShowCreatorFormSource$.subscribe((shouldShow: boolean) => {
            this.showQuoteCreator = shouldShow;
        });
    }

    subscribeToQuotesList(): void {
        this.quotesService.updatedQuotesListSource$.subscribe((quotes: Quote[]) => {
            this.quotesContents = quotes.map((quote: Quote) => {
                return this.utilsService.lowerCaseRemoveSpacesAndTrim(quote.content);
            });
            this.setQuotesValidators();
        });
    }

    //
    // ─── FORM METHODS ───────────────────────────────────────────────────────────────
    //

    createForm(): void {
        this.quoteCreationForm = this.formBuilder.group({
            quote: ['', [Validators.required, Validators.maxLength(Constants.QUOTE_MAX_LENGTH), NoWhitespaceValidator]],
            author: ['', Validators.maxLength(Constants.AUTHOR_MAX_LENGTH)],
        });
    }

    onSubmit(): void {
        if (this.quoteCreationForm.valid) {
            this.hideQuoteCreatorForm(false);
            this.emitQuoteCreationEvent();
            this.resetForm();
        }
    }

    resetForm(): void {
        this.quoteControl?.patchValue('');
        this.authorControl?.patchValue('');
        this.quoteCreationForm.markAsUntouched();
        this.cd.detectChanges();
    }

    setQuotesValidators(): void {
        this.quoteControl?.setValidators([
            Validators.required,
            Validators.maxLength(Constants.QUOTE_MAX_LENGTH),
            NoWhitespaceValidator,
            NoDuplicatesValidator(this.quotesContents, this.utilsService),
        ]);
    }

    //
    // ─── LAYOUT METHOD ──────────────────────────────────────────────────────────────
    //

    hideQuoteCreatorForm(shouldReset: boolean = false): void {
        if (shouldReset) {
            this.resetForm();
        }
        this.layoutService.hideCreatorForm();
    }

    //
    // ─── ON DESTROY ─────────────────────────────────────────────────────────────────
    //

    ngOnDestroy(): void {
        this.quotesSubscription.unsubscribe();
    }
}

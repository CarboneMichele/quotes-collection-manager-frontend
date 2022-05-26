import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LayoutService } from './../../../core/services/layout.service';
import { UtilsService } from './../../../core/services/utils.service';

import { NoWhitespaceValidator } from '../../validators/no-whitespace.validator';
import { NoDuplicatesValidator } from '../../validators/no-duplicates.validator';

import { Constants } from 'src/app/core/constants/constants';

import { QuoteParams } from './../../models/quotes.model';
import { Quote } from '../../models/quotes.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'qcm-quote-creator',
    templateUrl: './quote-creator.component.html',
    styleUrls: ['./quote-creator.component.scss'],
})
export class QuoteCreatorComponent implements OnInit, OnChanges, OnDestroy {
    public constants = Constants;
    public quoteCreationForm!: FormGroup;
    public showQuoteCreator = false;

    private quotesContents: string[] = [];
    private layoutSubscription!: Subscription;

    @Input() quotes!: Quote[];
    @Output() quoteCreated = new EventEmitter<QuoteParams>();

    constructor(
        private formBuilder: FormBuilder,
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
        this.subscribeToShowVariable();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.quotes = changes['quotes'].currentValue;
        this.createForm();
        this.setupForm();
    }

    emitQuoteCreationEvent(): void {
        this.quoteCreated.emit({ content: this.quoteControl?.value.trim(), author: this.authorControl?.value.trim() });
    }

    //
    // ─── SUBSCRIPTIONS METHODS ───────────────────────────────────────────────────────────────
    //

    subscribeToShowVariable(): void {
        this.layoutSubscription = this.layoutService.updatedShouldShowCreatorFormSource$.subscribe((shouldShow: boolean) => {
            this.showQuoteCreator = shouldShow;
            this.handleFieldsEditability();
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

    setupForm(): void {
        this.quotesContents = this.quotes.map((quote: Quote) => {
            return this.utilsService.lowerCaseRemoveSpacesAndTrim(quote.content);
        });
        this.setQuotesValidators();
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

    handleFieldsEditability(): void {
        if (!this.showQuoteCreator) {
            this.quoteControl?.disable();
            this.authorControl?.disable();
        } else {
            this.quoteControl?.enable();
            this.authorControl?.enable();
        }
    }

    //
    // ─── ON DESTROY ─────────────────────────────────────────────────────────────────
    //

    ngOnDestroy(): void {
        if (this.layoutSubscription) {
            this.layoutSubscription.unsubscribe();
        }
    }
}

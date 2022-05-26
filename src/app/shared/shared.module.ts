import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../misc/material/material.module';

import { QuoteCreatorComponent } from './components/quote-creator/quote-creator.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SuggestedQuoteComponent } from './components/suggested-quote/suggested-quote.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import { FilterQuotesByKeywordsPipe } from './pipes/filter-quotes-by-keywords.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
    declarations: [
        QuoteCreatorComponent,
        QuoteComponent,
        ToolbarComponent,
        FilterQuotesByKeywordsPipe,
        HighlightDirective,
        SuggestedQuoteComponent,
        NotFoundPageComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [
        QuoteCreatorComponent,
        QuoteComponent,
        MaterialModule,
        ToolbarComponent,
        FilterQuotesByKeywordsPipe,
        HighlightDirective,
        SuggestedQuoteComponent,
    ],
})
export class SharedModule {}

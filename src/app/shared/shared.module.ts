import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteCreatorComponent } from './components/quote-creator/quote-creator.component';

import { MaterialModule } from '../misc/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from './components/quote/quote.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilterByKeywordsPipe } from './pipes/filter-by-keywords.pipe';

@NgModule({
    declarations: [QuoteCreatorComponent, QuoteComponent, ToolbarComponent, FilterByKeywordsPipe],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [QuoteCreatorComponent, QuoteComponent, MaterialModule, ToolbarComponent],
})
export class SharedModule {}

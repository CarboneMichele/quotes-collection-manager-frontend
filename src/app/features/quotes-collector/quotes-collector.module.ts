import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesCollectorRoutingModule } from './quotes-collector-routing.module';
import { QuotesCollectorComponent } from '../quotes-collector/quotes-collector.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [QuotesCollectorComponent],
    imports: [CommonModule, SharedModule, QuotesCollectorRoutingModule],
})
export class QuotesCollectorModule {}

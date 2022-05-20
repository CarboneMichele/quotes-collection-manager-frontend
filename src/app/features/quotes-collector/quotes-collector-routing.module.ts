import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesCollectorComponent } from './quotes-collector.component';

const routes: Routes = [
    {
        path: '',
        component: QuotesCollectorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuotesCollectorRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { QuotesCollectorComponent } from './quotes-collector.component';

const routes: Routes = [
    {
        path: '',
        component: QuotesCollectorComponent,
        resolve: {
            uid: UserResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuotesCollectorRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, AuthPipe, canActivate } from '@angular/fire/auth-guard';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: 'sign-in',
        loadChildren: () => import('./features/auth/auth.module').then((m: typeof import('./features/auth/auth.module')) => m.AuthModule),
        ...canActivate((): AuthPipe => redirectLoggedInTo([''])),
    },
    {
        path: '',
        loadChildren: () =>
            import('./features/quotes-collector/quotes-collector.module').then(
                (m: typeof import('./features/quotes-collector/quotes-collector.module')) => m.QuotesCollectorModule
            ),
        ...canActivate((): AuthPipe => redirectUnauthorizedTo(['sign-in'])),
    },
    { path: '404', component: NotFoundPageComponent },
    { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

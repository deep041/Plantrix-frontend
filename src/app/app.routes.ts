import { Routes } from '@angular/router';
import { DesignSystemComponent } from './design-system/design-system.component';
import { authGuard } from './common/guard/auth.guard';
import { noAuthGuard } from './common/guard/no-auth.guard';

export const routes: Routes = [
    { path: '', canActivate: [authGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'auth', canActivate: [noAuthGuard], loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule) },
    { path: 'design-system', component: DesignSystemComponent }
];

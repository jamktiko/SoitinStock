import { Routes } from '@angular/router';
import { FrontPage } from './front-page/front-page';
import { RentingForm } from './renting-form/renting-form';
// import { Products } from './products/products';
// import { Page } from './rentingForm/page';
// import { NotFoundError } from 'rxjs';

import { LoginForm } from './login-form/login-form';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginForm },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'products', component: FrontPage, canActivate: [AuthGuard] },
  { path: 'products/:category', component: FrontPage, canActivate: [AuthGuard] },
  { path: 'renting', component: RentingForm, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];

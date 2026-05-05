import { Routes } from '@angular/router';
import { FrontPage } from './front-page/front-page';
import { RentingForm } from './renting-form/renting-form';
// import { Products } from './products/products';
// import { Page } from './rentingForm/page';
// import { NotFoundError } from 'rxjs';

export const routes: Routes = [
  { path: '', component: FrontPage },
  { path: 'products', component: FrontPage },
  { path: 'products/:category', component: FrontPage },
  { path: 'renting', component: RentingForm },
  { path: '**', redirectTo: '' },
];

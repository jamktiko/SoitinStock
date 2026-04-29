import { Routes } from '@angular/router';
import { FrontPage } from './front-page/front-page';
// import { Products } from './products/products';
import { Page } from './page/page';
// import { NotFoundError } from 'rxjs';

export const routes: Routes = [
  { path: '', component: FrontPage },
  { path: 'products', component: FrontPage },
  { path: 'products/:category', component: FrontPage },
  { path: '**', redirectTo: '' },
];

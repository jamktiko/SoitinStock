// Delete the parts with comments lines after API implementation
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom, // this
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InMemoryDataService } from './inMemoryDataService'; //this
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';// this

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })), //this
  ],
};

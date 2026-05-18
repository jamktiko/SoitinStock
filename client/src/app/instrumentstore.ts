/* 

A functional store created with NgRx Signalstore library that maintains the 
application's product state. Products are fetched from the database
to the store when the application starts.

*/

import { DestroyRef, effect, inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { RawInstrument, RawInstrumentType } from './.models/instrument';
import { ApiService } from './apiService';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RawItem } from './.models/item';
import { AuthService } from './auth.service';

interface ItemsState {
  items: RawItem[];
  instruments: RawInstrument[];
  types: RawInstrumentType[];
  isLoading: boolean;
}

const initialState: ItemsState = { items: [], instruments: [], types: [], isLoading: true };
/*
InstrumentStore is a functional store, that is, a function
whose arguments are functions and objects
*/
export const ProductStore = signalStore(
  { providedIn: 'root' },
  // Store's initial state, on top of which comes a new state from the database
  withState(initialState),
  // Store's lifecycle methods, that is, hooks
  withHooks({
    /* In onInit hook we can execute events that occur
       when store is loaded into memory. */
    onInit(
      store,
      pservice = inject(ApiService),
      auth = inject(AuthService),
      destroyRef = inject(DestroyRef),
    ) {
      effect(() => {
        if (auth.loginState()) {
          pservice
            .GetContentTypes()
            .pipe(
              takeUntilDestroyed(destroyRef),

              tap((types) => patchState(store, { types })),
            )
            .subscribe();

          pservice
            .GetContents()
            .pipe(
              takeUntilDestroyed(destroyRef),

              tap((instruments) => patchState(store, { instruments })),
            )
            .subscribe();

          pservice
            .GetItems()
            .pipe(
              takeUntilDestroyed(destroyRef),
              tap((items) => patchState(store, { items, isLoading: false })),
            )
            .subscribe();
        }
      });
    },

    /* The store's actual data handling methods are in the
     withMethods function. The withMethods function contains an anonymous function that contains 
     the store's data handling methods. products and store come in as
     arguments. 
  */
  }),
  withMethods(({ ...store }, pservice = inject(ApiService)) => ({
    refreshItems() {
      return pservice.GetItems().pipe(tap((items) => patchState(store, { items })));
    },
  })),
);

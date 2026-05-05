/* 
PRODUCT STORE

A functional store created with NgRx Signalstore library that maintains the 
application's product state. Products are fetched from the mock database
to the store when the application starts.

So the store is a kind of data buffer, thanks to which we don't need to constantly 
update the database. Passing the same data to multiple components is easier, 
because we don't need to transfer data between components. Data always flows 
only from the store to components or from components to the store.
*/

import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Instruments, RawInstrument, RawInstrumentType } from './.models/instrument';
import { ApiService } from './apiService';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RawItem } from './.models/item';

interface ItemsState {
  items: RawItem[];
  instruments: RawInstrument[];
  types: RawInstrumentType[];
  isLoading: boolean;
}

const initialState: ItemsState = { items: [], instruments: [], types: [], isLoading: true };
/*
ProductStore is a functional store, that is, a function
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
    onInit(store, pservice = inject(ApiService)) {
      // Load both items and instruments
      pservice
        .GetContentTypes()
        .pipe(
          takeUntilDestroyed(),
          tap((types) => patchState(store, { types })),
        )
        .subscribe();

      pservice
        .GetContents()
        .pipe(
          takeUntilDestroyed(),
          tap((instruments) => patchState(store, { instruments })),
        )
        .subscribe();

      pservice
        .GetItems()
        .pipe(
          takeUntilDestroyed(),
          tap((items) => patchState(store, { items, isLoading: false })),
        )
        .subscribe();
    },
    /* In onDestroy hook we can execute events that occur
       when store is removed from memory. For example, saving product state
       to database when application use is terminated.
    */
    onDestroy(store) {
      // Product state saving to database could be here
      console.log('ShopStore removed from memory', store);
    },
  }),
  /* The store's actual data handling methods are in the
     withMethods function. The withMethods function contains an anonymous function that contains 
     the store's data handling methods. products and store come in as
     arguments. 
  */
  // withMethods(({ instruments, ...store }) => ({
  //   reduceAmount(id: number) {
  //     const updated = instruments().map((i) => (i.id_Instrument === id ? { ...i, amount: i.amount - 1 } : i));
  //     patchState(store, { instruments: updated });
  //   },
  //   addAmount(id: number) {
  //     const updated = instruments().map((i) => (i.id === id ? { ...i, amount: i.amount + 1 } : i));
  //     patchState(store, { instruments: updated });
  //   },
  // })),
);

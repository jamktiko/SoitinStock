import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { RawItem, RentalItem } from './.models/item';

import { computed } from '@angular/core';
import { RawInstrument } from './.models/instrument';

const initialState: { products: RentalItem[] } = {
  products: [],
};
export const RentalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ products }) => ({
    totalcount: computed(() => products().reduce((sum, p) => sum + p.amount, 0)),
    totalsum: computed(() => products().reduce((sum, p) => sum + p.totalprice, 0)),
    cartItemBarcodes: computed(() => products().map((p) => p.barcode)),
  })),

  withMethods(({ products, ...store }) => ({
    addToCart(p: RentalItem) {
      const exists = products().some((item) => item.barcode === p.barcode);
      if (!exists) {
        patchState(store, { products: [...products(), { ...p, amount: 1 }] });
      } else {
        this.increment(p.barcode);
      }
    },
    removeFromCart(p: RentalItem) {
      const prod = products().find((item) => item.barcode === p.barcode);
      if (!prod) return;
      if (prod.amount > 1) {
        const updated = products().map((item) =>
          item.barcode === p.barcode ? { ...item, amount: item.amount - 1 } : item,
        );
        patchState(store, { products: updated });
      } else {
        patchState(store, { products: products().filter((item) => item.barcode !== p.barcode) });
      }
    },
    increment(barcode: string) {
      const updated = products().map((item) =>
        item.barcode === barcode ? { ...item, amount: item.amount + 1 } : item,
      );
      patchState(store, { products: updated });
    },
    removeItem(p: RentalItem) {
      patchState(store, { products: products().filter((item) => item.barcode !== p.barcode) });
    },
    clearCart() {
      patchState(store, { products: [] });
    },
  })),
);

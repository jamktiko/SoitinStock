import { Component, inject, input, signal } from '@angular/core';
import { ProductStore } from '../instrumentstore';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { Modal } from '../modal/modal';
import { Instruments } from '../.models/instrument';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  items = input<any>([]);
  instruments = input<any>([]);
  modal = signal(false);
  dialog = inject(MatDialog);
  // Inject, that is, connect the store to the component
  // The component has no local state; the state is in the store
  readonly pstore = inject(ProductStore);
  // readonly cstore = inject();
  getInstrumentName(instrumentId: number): string {
    const instrument = this.pstore.instruments().find((i) => i.id_Instrument === instrumentId);
    return instrument?.name || 'Unknown Instrument';
  }
  constructor() {}

  showModal(instrument: Instruments) {
    this.dialog.open(Modal, {
      width: '500px',
      data: { instrument },
    });
  }
  // addToCart(p: Products) {
  //   // Reduce product quantity in inventory
  //   // this.pstore.reduceAmount(p.id);
  //   // New product to shopping cart. Quantity is initialized to zero, which increases
  //   // by one each time a new product arrives in the cart
  //   const prod = {
  //     id: p.id,
  //     name: p.name,
  //     price: p.price,
  //     amount: 0,
  //     totalprice: p.price,
  //   };
  //   // Shopping cart state updates to cart store
  //   // this.cstore.addToCart(prod);
  // }
}

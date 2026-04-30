import { Component, inject, input } from '@angular/core';
import { ProductStore } from '../instrumentstore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  items = input<any>([]);
  // Inject, that is, connect the store to the component
  // The component has no local state; the state is in the store
  readonly pstore = inject(ProductStore);
  // readonly cstore = inject();

  constructor() {
    console.log('Products loaded, instruments:', this.pstore.items());
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

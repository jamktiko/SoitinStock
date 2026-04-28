import { Component, inject } from '@angular/core';
import { ProductStore } from '../instrumentstore';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  // injektoidaan eli liitetään storet komponenttiin
  // komponentilla ei ole omaa tilaa, vaan tila on storessa
  readonly pstore = inject(ProductStore);
  // readonly cstore = inject();

  constructor() {}

  // addToCart(p: Products) {
  //   // vähennetään tuotteen määrää varastossa
  //   this.pstore.reduceAmount(p.id);
  //   // uusi tuote ostoskoriin. Määrä alustetaan nollaksi, joka lisääntyy
  //   // aina yhdellä kun uusi tuote saapuu koriin
  //   const prod = {
  //     id: p.id,
  //     name: p.name,
  //     price: p.price,
  //     amount: 0,
  //     totalprice: p.price,
  //   };
  //   // ostoskorin tila päivittyy cartstoreen
  //   // this.cstore.addToCart(prod);
  // }
}

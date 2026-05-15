import { Component, inject, input, signal, computed } from '@angular/core';
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
  // Reactive inputs, that triggers effects and computed signals when changed
  modal = signal(false);
  dialog = inject(MatDialog);
  // Inject, that is, connect the store to the component
  // The component has no local state; the state is in the store
  readonly pstore = inject(ProductStore);
  allItems = this.pstore.items;
  // readonly cstore = inject();
  getInstrumentName(instrumentId: number): string {
    const instrument = this.pstore.instruments().find((i) => i.id_Instrument === instrumentId);
    return instrument?.name || 'Unknown Instrument';
  } // Gets the name of the instrument based on id

  displayInstrumentName(name: string): string {
    const labels: Record<string, string> = {
      guitar: 'Guitars',
      piano: 'Pianos',
      violin: 'Violins',
      drums: 'Drums',
      harp: 'Harps',
      accordion: 'Accordions',
    };

    return labels[name.toLowerCase()] || name;
  }

  itemCountByInstrument = computed(() => {
    const items = this.allItems();
    const counts = new Map<number, number>();

    items.forEach((item) => {
      if (item.is_available) {
        const id = item.Instrument_id_Instrument;
        counts.set(id, (counts.get(id) || 0) + 1);
      }
    });

    return counts;
  }); // Displays the amount of items based on id

  getItemCount(instrumentId: number): number {
    return this.itemCountByInstrument().get(instrumentId) || 0;
  }
  constructor() {}

  showModal(instrument: Instruments) {
    this.dialog.open(Modal, {
      width: '500px',
      data: { instrument },
    });
  }
}

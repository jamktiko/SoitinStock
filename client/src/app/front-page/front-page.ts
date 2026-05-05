import { Component, inject, OnInit, computed } from '@angular/core';
// With ActivatedRoute we get id from route to component
import { ActivatedRoute } from '@angular/router';
// With ContentService we get content from server to component
// import { ContentService } from '../content.service';
// import { Instruments, RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap, combineLatest } from 'rxjs';
import { Products } from '../products/products';
import { ProductStore } from '../instrumentstore';
import { RawItem } from '../.models/item';
@Component({
  selector: 'app-page',
  templateUrl: './front-page.html',
  styleUrl: './front-page.css',
  imports: [Products],
})
export class FrontPage {
  // private cservice = inject(ContentService);
  private route = inject(ActivatedRoute);
  pstore = inject(ProductStore);

  activeCategory = toSignal(this.route.paramMap.pipe(map((params) => params.get('category'))), {
    initialValue: null,
  });

  filteredItems = computed(() => {
    const category = this.activeCategory();
    const items = this.pstore.items();
    const instruments = this.pstore.instruments();
    const types = this.pstore.types();

    if (!category || items.length === 0 || types.length === 0 || instruments.length === 0) {
      return { instruments: [], items: [] };
    }

    const typeId = types.find((t) => t.type_name.toLowerCase() === category.toLowerCase())?.id_type;

    if (!typeId) return { instruments: [], items: [] };

    const filteredInstruments = instruments.filter((i) => i.Instrument_type_id === typeId);

    const instrumentIds = instruments
      .filter((i) => i.Instrument_type_id === typeId)
      .map((i) => i.id_Instrument);

    const filteredItemsList = items.filter((item) =>
      instrumentIds.includes(item.Instrument_id_Instrument),
    );

    return { instruments: filteredInstruments, items: filteredItemsList };
  });
}

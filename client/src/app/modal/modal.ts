import {
  Component,
  inject,
  ChangeDetectionStrategy,
  computed,
  signal,
  effect,
} from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { ApiService } from '../apiService';
import { RawInstrument } from '../.models/instrument';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { map, switchMap } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';
import { RentalStore } from '../rentalStore';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductStore } from '../instrumentstore';
import { CommonModule } from '@angular/common';
import { RawItem, RentalItem } from '../.models/item';
import { image_map } from '../.models/imageMap';
@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  // route: ActivatedRoute = inject(ActivatedRoute);
  // apiservice = inject(ApiService);
  // // dialog = inject(MatDialog);
  imageIsLoading = signal(true);

  dialogRef = inject(MatDialogRef<Modal>);
  data = inject(MAT_DIALOG_DATA) as { instrument: RawInstrument };
  // Makes instrument into an injection token, that is then inserted into data, and used in dialog
  rstore = inject(RentalStore);
  pstore = inject(ProductStore);
  // protected instrument = toSignal(
  //   this.route.paramMap.pipe(
  //     map((p) => parseInt(p.get('id') || '0', 10)),
  //     switchMap((id) => this.apiservice.getInstrumentId(id)),
  //   ),
  //   { initialValue: undefined as RawInstrument | undefined },
  // );

  relatedItems = computed(() => {
    const instrument = this.data?.instrument;
    if (!instrument) {
      return [];
    }
    return this.pstore
      .items()
      .filter((item) => item.Instrument_id_Instrument === instrument.id_Instrument);
  });
  // Filters items based on id

  // constructor(
  //   public dialogRef: MatDialogRef<Modal>,
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  // ) {}
  // products.ts

  filteredItems = computed(() => {
    const cartIds = this.rstore.cartItemBarcodes();
    return this.relatedItems().filter((item) => !cartIds.includes(item.barcode));
  }); //Filters items based on barcodes.

  addToCart(item: RawItem) {
    this.rstore.addToCart({ ...item, amount: 1 } as RentalItem);
  } // adds item to cart
  constructor() {
    effect(() => {
      this.data.instrument.id_Instrument;

      this.imageIsLoading.set(true);

      setTimeout(() => {
        this.imageIsLoading.set(false);
      }, 1000);
    });
    // Used for Image showing
  }
  getInstrumentImage() {
    const imageUrl = image_map[this.data.instrument.Instrument_type_id];
    return imageUrl || '/pics/placeholder.jpg';
  } // Gets imageUrl based on number on the imagemap

  closeModal() {
    this.dialogRef.close();
  }
  imageLoad() {
    this.imageIsLoading.set(false);
  }
}

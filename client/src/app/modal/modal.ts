import { Component, inject, ChangeDetectionStrategy, Inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../apiService';
import { RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductStore } from '../instrumentstore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiservice = inject(ApiService);
  // dialog = inject(MatDialog);

  dialogRef = inject(MatDialogRef<Modal>);
  data = inject(MAT_DIALOG_DATA);
  pstore = inject(ProductStore);
  protected instrument = toSignal(
    this.route.paramMap.pipe(
      map((p) => parseInt(p.get('id') || '0', 10)),
      switchMap((id) => this.apiservice.getInstrumentId(id)),
    ),
    { initialValue: undefined as RawInstrument | undefined },
  );

  relatedItems = computed(() => {
    const instrument = this.data?.instrument;
    if (!instrument) {
      return [];
    }
    return this.pstore
      .items()
      .filter((item) => item.Instrument_id_Instrument === instrument.id_Instrument);
  });
  // constructor(
  //   public dialogRef: MatDialogRef<Modal>,
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  // ) {}

  constructor() {}

  closeModal() {
    this.dialogRef.close();
  }
}

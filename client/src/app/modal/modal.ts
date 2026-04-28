import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../apiService';
import { RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiservice = inject(ApiService);
  protected instrument = toSignal(
    this.route.paramMap.pipe(
      map((p) => parseInt(p.get('id') || '0', 10)),
      switchMap((id) => this.apiservice.getInstrumentId(id)),
    ),
    { initialValue: undefined as RawInstrument | undefined },
  );

  constructor() {}
}

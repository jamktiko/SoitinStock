import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
// import { ContentService } from '../content.service';
import { RawInstrumentType, RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../apiService';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  // content: RawInstrumentType[] | undefined;
  //Otetaan contentsevice käyttöön ja haetaan content aina, kun komponentti latautuu muistiin
  private cservice = inject(ApiService);
  content = toSignal(this.cservice.GetContentTypes(), { initialValue: [] });
}

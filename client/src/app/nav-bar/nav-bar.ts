import { Component, inject, OnInit } from '@angular/core';

import { RouterLink, Router } from '@angular/router';
// import { ContentService } from '../content.service';
import { RawInstrumentType, RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../apiService';
import { AuthService } from '../auth.service';

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
  auth = inject(AuthService);
  router = inject(Router);
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

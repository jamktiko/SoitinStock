import { Component, inject, OnInit, signal, effect } from '@angular/core';

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
  private cservice = inject(ApiService);
  auth = inject(AuthService);
  router = inject(Router);

  content = signal<RawInstrumentType[]>([]);

  constructor() {
    // Reactive effect: runs whenever auth.isLoggedIn() changes
    effect(() => {
      if (this.auth.loginState()) {
        this.cservice.GetContentTypes().subscribe((data) => {
          this.content.set(data);
        });
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

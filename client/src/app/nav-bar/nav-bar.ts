import { Component, inject, OnInit, signal, effect } from '@angular/core';

import { RouterLink, RouterLinkActive, Router } from '@angular/router';
// import { ContentService } from '../content.service';
import { RawInstrumentType, RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../apiService';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
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

  // Jun added: converting raw values to user-friendly display names
  displayName(type: string): string {
    const labels: Record<string, string> = {
      guitar: 'Guitars',
      piano: 'Pianos',
      violin: 'Violins',
      drums: 'Drums',
      harp: 'Harps',
      accordion: 'Accordions',
    };

    return labels[type.toLowerCase()] || type;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

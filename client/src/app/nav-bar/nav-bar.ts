import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ContentService } from '../content.service';
import { RawInstrumentType, RawInstrument } from '../.models/instrument';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  content: RawInstrumentType[] | undefined;
  //Otetaan contentsevice käyttöön ja haetaan content aina, kun komponentti latautuu muistiin
  private cservice = inject(ContentService);
  ngOnInit(): void {
    this.cservice.GetContentTypes().subscribe((data) => (this.content = data));
  }
}

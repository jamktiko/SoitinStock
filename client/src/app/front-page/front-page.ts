import { Component, inject, OnInit } from '@angular/core';
// With ActivatedRoute we get id from route to component
import { ActivatedRoute } from '@angular/router';
// With ContentService we get content from server to component
import { ContentService } from '../content.service';
import { Instruments, RawInstrument } from '../.models/instrument';

@Component({
  selector: 'app-page',
  templateUrl: './front-page.html',
  styleUrl: './front-page.css',
})
export class FrontPage implements OnInit {
  // The content of the "page" to be displayed comes to pageContent variable
  frontpagecontent: Instruments | undefined;
  // With DI we initialize two objects
  instruments: RawInstrument[] | undefined;
  private cservice = inject(ContentService);
  private route = inject(ActivatedRoute);
  // user = inject(user);
  /*
  When component loads into memory, we get id from route,
  based on which we fetch the corresponding content to the component.
  */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');

      if (category) {
        // Use the service method that handles filtering
        this.cservice.GetInstrumentsByCategory(category).subscribe((data) => {
          this.instruments = data;
        });
      } else {
        // Load all instruments for home page
        this.cservice.GetContents().subscribe((data) => {
          this.instruments = data;
        });
      }
    });
  }
}

import { Component, inject, OnInit, computed } from '@angular/core';
// With ActivatedRoute we get id from route to component
import { ActivatedRoute } from '@angular/router';
// With ContentService we get content from server to component
import { ContentService } from '../content.service';
// import { Instruments, RawInstrument } from '../.models/instrument';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './front-page.html',
  styleUrl: './front-page.css',
})
export class FrontPage {
  private cservice = inject(ContentService);
  private route = inject(ActivatedRoute);

  // Signal for active category from route
  activeCategory = toSignal(this.route.paramMap.pipe(map((params) => params.get('category'))));

  // Signal for instruments - automatically updates when category changes
  instruments = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const category = params.get('category');
        if (category) {
          return this.cservice.GetInstrumentsByCategory(category);
        } else {
          return this.cservice.GetContents();
        }
      }),
    ),
    // Show loading state initially
    { initialValue: undefined },
  );

  // Computed signal for loading state
  isLoading = computed(() => this.instruments() === undefined);
}

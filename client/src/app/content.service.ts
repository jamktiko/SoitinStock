// For displaying different categories

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map, switchMap } from 'rxjs';
import { Instruments, RawInstrumentType, RawInstrument } from './.models/instrument';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  // apiurl = 'api/productCategorys'; // original api/content
  constructor(
    private http: HttpClient, // can also use private http = inject(HttpClient)
  ) {}

  // Make a request to table to get the entire content.
  GetContents(): Observable<RawInstrument[]> {
    return this.http.get<RawInstrument[]>('api/instruments');
    // Error handling could be added here
  }

  GetContentTypes(): Observable<RawInstrumentType[]> {
    return this.http.get<RawInstrumentType[]>('api/productCategories');
  }
  // Gets a single content object by its id
  GetContentByID(contentid: string): Observable<Instruments> {
    return this.http.get<Instruments>('api/instruments' + '/' + contentid).pipe(
      catchError((error) => {
        console.error('An error occurred: ', error);
        return throwError(() => new Error(error.message || 'Unknown error'));
      }),
    );
  }
  GetInstrumentsByCategory(categoryName: string): Observable<RawInstrument[]> {
    return this.GetContentTypes().pipe(
      switchMap((categories) => {
        // Find the category ID by name
        const category = categories.find(
          (c) => c.type_name.toLowerCase() === categoryName.toLowerCase(),
        );
        const categoryId = category?.id_type;

        // Filter instruments by the category ID
        return this.GetContents().pipe(
          map((instruments) => instruments.filter((i) => i.Instrument_type_id === categoryId)),
        );
      }),
    );
  }
}

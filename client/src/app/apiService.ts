import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instruments, RawInstrument, RawInstrumentType } from './.models/instrument';
import { RawItem } from './.models/item';
import { catchError, Observable, throwError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Backend server url

  constructor(private http: HttpClient) {}

  // Error handling method that returns an observable
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  getMessage(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/api/test`, { responseType: 'text' as 'json' });
  }
  // Request the root endpoint and returns instruments as a observable
  // getInstruments(): Observable<RawInstrument[]> {
  //   return this.http.get<RawInstrument[]>(this.apiUrl).pipe(catchError(this.handleError));
  // }

  getInstrumentId(id: number): Observable<RawInstrument | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RawInstrument>(url).pipe(catchError(this.handleError));
  }
  GetContents(): Observable<RawInstrument[]> {
    return this.http.get<RawInstrument[]>(`${this.apiUrl}/api/instruments`);
    // Error handling could be added here
  }

  GetItems(): Observable<RawItem[]> {
    return this.http.get<RawItem[]>(`${this.apiUrl}/api/items`);
    // Error handling could be added here
  }
  GetContentTypes(): Observable<RawInstrumentType[]> {
    return this.http.get<RawInstrumentType[]>(`${this.apiUrl}/api/types`);
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instruments, RawInstrument, RawInstrumentType } from './.models/instrument';
import { RawItem } from './.models/item';
import { catchError, Observable, throwError, map, switchMap } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl; // Backend server url
  // private apiUrl = 'http://localhost:3000/api'; // LocalhostUrl

  constructor(private http: HttpClient) {}

  // Error handling method that returns an observable
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  getMessage(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/test`, { responseType: 'text' as 'json' });
  } // for debugging
  // Request the root endpoint and returns instruments as a observable
  // getInstruments(): Observable<RawInstrument[]> {
  //   return this.http.get<RawInstrument[]>(this.apiUrl).pipe(catchError(this.handleError));
  // }

  getInstrumentId(id: number): Observable<RawInstrument | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RawInstrument>(url).pipe(catchError(this.handleError));
  } // returns instrument by id
  GetContents(): Observable<RawInstrument[]> {
    return this.http.get<RawInstrument[]>(`${this.apiUrl}/instruments`);
    //Gets all instruments
  }

  GetItems(): Observable<RawItem[]> {
    return this.http.get<RawItem[]>(`${this.apiUrl}/items`);
    // Gets all items
  }
  GetContentTypes(): Observable<RawInstrumentType[]> {
    return this.http.get<RawInstrumentType[]>(`${this.apiUrl}/types`);
    // Gets all instrument types
  }
  GetContentByID(contentid: string): Observable<Instruments> {
    return this.http.get<Instruments>(`${this.apiUrl}/instruments/${contentid}`).pipe(
      catchError((error) => {
        console.error('An error occurred: ', error);
        return throwError(() => new Error(error.message || 'Unknown error'));
      }),
    );
    // Gets a single content object by its id
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

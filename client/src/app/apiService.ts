import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instruments, RawInstrument, RawInstrumentType } from './.models/instrument';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/test'; // Backend server url

  constructor(private http: HttpClient) {}

  // Error handling method that returns an observable
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }

  getMessage(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/`, { responseType: 'text' as 'json' });
  }
  // Request the root endpoint and returns instruments as a observable
  getInstruments(): Observable<RawInstrument[]> {
    return this.http.get<RawInstrument[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getInstrumentId(id: number): Observable<RawInstrument | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RawInstrument>(url).pipe(catchError(this.handleError));
  }
}

// Eri kategorian näyttämistä varten

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Instruments, RawInstrumentType, RawInstrument } from './.models/instrument';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  apiurl = 'api/content';
  constructor(
    private http: HttpClient, // voi käyttää myös private http = inject(HttpClient)
  ) {}

  // Tehdään palvelimelle pyyntö, jolla haetaan koko content-taulukko
  GetContents(): Observable<RawInstrument[]> {
    return this.http.get<RawInstrument[]>(this.apiurl);
    //virheenkäsittely voitaisiin tehdä tähän
  }

  GetContentTypes(): Observable<RawInstrumentType[]> {
    return this.http.get<RawInstrumentType[]>(this.apiurl);
  }
  //Hakee yhden content-olion id:n perusteella
  GetContentByID(contentid: string): Observable<Instruments> {
    return this.http.get<Instruments>(this.apiurl + '/' + contentid).pipe(
      catchError((error) => {
        console.error('Tapahtui virhe: ', error);
        return throwError(() => new Error(error.message || 'Tuntematon virhe'));
      }),
    );
  }
}

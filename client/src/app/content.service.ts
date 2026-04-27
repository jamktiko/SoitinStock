// Eri kategorian näyttämistä varten

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Content } from './content';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  apiurl = 'api/content';
  constructor(
    private http: HttpClient, // voi käyttää myös private http = inject(HttpClient)
  ) {}

  // Tehdään palvelimelle pyyntö, jolla haetaan koko content-taulukko
  GetContents(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiurl);
    //virheenkäsittely voitaisiin tehdä tähän
  }

  //Hakee yhden content-olion id:n perusteella
  GetContentByID(contentid: string): Observable<Content> {
    return this.http.get<Content>(this.apiurl + '/' + contentid).pipe(
      catchError((error) => {
        console.error('Tapahtui virhe: ', error);
        return throwError(() => new Error(error.message || 'Tuntematon virhe'));
      }),
    );
  }
}

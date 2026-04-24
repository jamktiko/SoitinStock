import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Backend server url

  constructor(private http: HttpClient) {}

  // Request the root endpoint and return the response as a string.
  // server.js returns plain text ("Hello from Backend!"), so we request text.
  // Note: HttpClient defaults to JSON responses; passing `responseType: 'text'`
  // requires the `as 'json'` cast when used with the generic `<string>` here.
  getMessage(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/`, { responseType: 'text' as 'json' });
  }
}

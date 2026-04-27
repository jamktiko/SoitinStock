import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private apiService = inject(ApiService); // "Injects" the value of ApiService-component to apiService-property. If there is no value, turns into null
  message = toSignal(
    this.apiService.getMessage().pipe(
      catchError((error) => {
        console.error('API Error Details:', error);
        return of(`Error: ${error.status || 'Unknown'}`);
      }),
    ),
    { initialValue: '' },
  ); // toSignal turns apiService from an observable to a signal, which value can be shown in message()

  ngOnInit() {} // Activates App class on start
}

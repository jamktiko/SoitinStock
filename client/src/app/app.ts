import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { NavBar } from './nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './apiService';
// import { RouterOutlet } from "../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBar, RouterOutlet],
})
export class App implements OnInit {
  private authService = inject(AuthService);
  message = signal('');

  ngOnInit() {
    this.authService.handleLoginCallback();
  }
}

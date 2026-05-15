import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [MatProgressSpinnerModule, MatCardModule, MatIconModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  auth = inject(AuthService);

  login() {
    this.auth.login();
  }

  output = 'No action yet.';

  async callApi() {
    const token = this.auth.getToken();
    if (!token) {
      this.output = 'Not logged in.';
      return;
    }
    try {
      const response = await fetch('/api/test', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      this.output = JSON.stringify(data, null, 2);
    } catch (err: any) {
      this.output = err.message;
    }
  } // Used for debugging.
}

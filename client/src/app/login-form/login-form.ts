import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    // MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  error = '';
  isLoading = false;
  hidePassword = true;
  auth = inject(AuthService);
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Call your API here
      console.log('Login attempt:', this.loginForm.value);
      // this.authService.login(this.loginForm.value).subscribe({...});
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
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
  }
}

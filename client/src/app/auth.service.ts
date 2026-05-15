import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  cognitoDomain = environment.cognitoDomain;
  clientId = environment.clientId;
  redirectUri = environment.redirectUri;
  loginState = signal(false); // Signal for checking if user is logged in

  tokenEndpoint = `${this.cognitoDomain}/oauth2/token`;
  authEndpoint = `${this.cognitoDomain}/oauth2/authorize`;

  login() {
    const url =
      `${this.authEndpoint}?response_type=code` +
      `&client_id=${encodeURIComponent(this.clientId)}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=openid+profile+email`;

    window.location.href = url;
  }

  // logout() {
  //   localStorage.clear();
  // }
  //

  logout() {
    localStorage.clear();

    const logoutUrl =
      `${this.cognitoDomain}/logout` +
      `?client_id=${encodeURIComponent(this.clientId)}` +
      `&logout_uri=${encodeURIComponent(this.redirectUri)}`;

    window.location.href = logoutUrl;
    this.loginState.set(false); // Update signal

    // Redirect to login page
    //  this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }

  async exchangeCodeForToken(code: string) {
    const body = new URLSearchParams();

    body.append('grant_type', 'authorization_code');
    body.append('client_id', this.clientId);
    body.append('code', code);
    body.append('redirect_uri', this.redirectUri);

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const tokens = await response.json();

    localStorage.setItem('id_token', tokens.id_token);
    localStorage.setItem('access_token', tokens.access_token);
    this.loginState.set(true); // Update signal

    return tokens;
  }

  handleLoginCallback() {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');

    if (code) {
      this.exchangeCodeForToken(code)
        .then(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
          // added route to products page after successful login (test by jun)
          this.router.navigate(['/products']);
        })
        .catch(console.error);
    }
  }
}

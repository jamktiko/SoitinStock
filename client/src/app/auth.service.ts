import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cognitoDomain = environment.cognitoDomain;
  clientId = environment.clientId;
  redirectUri = environment.redirectUri;

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

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

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

    return tokens;
  }

  handleLoginCallback() {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');

    if (code) {
      this.exchangeCodeForToken(code)
        .then(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(console.error);
    }
  }
}

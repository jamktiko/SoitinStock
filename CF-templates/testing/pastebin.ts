import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    output = 'No action yet.';
    isLoggedIn = false;
    constructor(private auth: AuthService) {}
    async ngOnInit() {
        await this.auth.handleLoginCallback();
        this.updateState();
    }
    updateState() {
        this.isLoggedIn = this.auth.isLoggedIn();
    }
    login() {
        this.auth.login();
    }
    logout() {
        this.auth.logout();
        this.output = 'Logged out.';
        this.updateState();
    }
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginForm implements OnInit {
  error = '';
  // injektoidaan router ja authService
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys
  onSubmit(formData: any) {
    //console.log(formData);
    // authServicen login-metodi palauttaa observablen, josta saadaan true tai false
    this.authService.login(formData.tunnus, formData.salasana).subscribe((result) => {
      if (result === true) {
        // true päästää admin-komponenttiin
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Tunnus tai salasana väärä';
      }
    });
  }
}

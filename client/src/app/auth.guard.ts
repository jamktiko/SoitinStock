// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loginState()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

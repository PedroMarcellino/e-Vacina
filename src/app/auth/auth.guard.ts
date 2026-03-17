import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(): boolean {

    // Só executa isso se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) return true;

      this.router.navigate(['/login']);
      return false;
    }

    // Se estiver no servidor, bloqueia acesso sem quebrar a aplicação
    return false;
  }
}

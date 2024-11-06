import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      take(1), // Garante que a autenticação seja verificada apenas uma vez
      map((user) => {
        console.log('AuthGuard - User:', user); // Para verificar o estado do usuário
        if (user) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}

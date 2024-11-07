import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      take(1),
      map((user) => {
        console.log('AuthGuard - User:', user);
        if (user) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Erro ao verificar autenticação:', error);
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}

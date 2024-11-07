import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private toastr: ToastrService // Adiciona o serviço de notificação
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = user != null;

        if (this.loggedIn && this.user) {
          console.log(this.user);
          this.router.navigate(['/shopping-list']);
        }
      },
      (error) => {
        // Tratar erro de autenticação
        console.error('Erro ao fazer login:', error);
        this.toastr.error('Erro ao fazer login. Tente novamente.', 'Erro'); // Notificação com toastr
      }
    );
  }
}

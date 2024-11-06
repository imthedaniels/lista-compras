import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shopping-list', component: AppComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona para o login por padrão
  { path: '**', component: PageNotFoundComponent },
];

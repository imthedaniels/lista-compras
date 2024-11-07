import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { MainComponent } from './main.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ShoppingListComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '726136334685-27c50p81depi9jcjhijvho5ovi8sj93c.apps.googleusercontent.com'
            ), // Substitua pelo seu Client ID do Google
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [MainComponent], // Apenas o MainComponent deve ser o bootstrap
})
export class AppModule {}

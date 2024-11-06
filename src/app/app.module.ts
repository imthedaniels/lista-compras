import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './auth.guard';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    AppComponent,
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
  bootstrap: [MainComponent], // Apenas o AppComponent deve ser o bootstrap
})
export class AppModule {}

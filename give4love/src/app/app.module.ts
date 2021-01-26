import { NgModule, LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppGlobals } from './App.Globals';
import { SignUpConfirmComponent } from './pages/sign-up-confirm/sign-up-confirm.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiUsersService } from './services/api-users.service';
import { ApiClientService } from './services/api-client.service';
import { ApiAuthService } from './services/api-auth.service';
import { ApiPartnerService } from './services/api-partner.service';
import { DonantesComponent } from './pages/donantes/donantes.component';
import { DonacionComponent } from './pages/donacion/donacion.component';
import { DonacionHeaderComponent } from './components/donacion-header/donacion-header.component';
import { PayComponent } from './pages/pay/pay.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ConfigAccountComponent } from './pages/config-account/config-account.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { AuthService } from './services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    SignUpConfirmComponent,
    NavbarComponent,
    DonantesComponent,
    DonacionComponent,
    DonacionHeaderComponent,
    PayComponent,
    FormLoginComponent,
    ConfigAccountComponent,
    FormUserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'es-ES' } ,
    AppGlobals,
    ApiUsersService,
    ApiClientService,
    ApiAuthService,
    ApiPartnerService,
    AuthService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

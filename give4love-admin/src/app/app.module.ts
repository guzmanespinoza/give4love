import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';

import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import { AppGlobals } from './App.Globals';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormPartnerComponent } from './components/form-partner/form-partner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { AuthService } from './services/auth.service';
import { DonationTypesComponent } from './pages/donation-types/donation-types.component';
import { FormDonationTypesComponent } from './components/form-donation-types/form-donation-types.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpConfirmComponent } from './pages/sign-up-confirm/sign-up-confirm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RefundComponent } from './pages/refund/refund.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    FormPartnerComponent,
    NavbarComponent,
    SidebarComponent,
    FormUserComponent,
    FormLoginComponent,
    DonationTypesComponent,
    FormDonationTypesComponent,
    HomeComponent,
    ProfileComponent,
    SignUpConfirmComponent,
    SettingsComponent,
    FilterPipe,
    RefundComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    AppGlobals,
    AuthService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

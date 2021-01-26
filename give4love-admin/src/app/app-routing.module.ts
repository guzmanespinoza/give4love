import { DonationTypesComponent } from './pages/donation-types/donation-types.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpConfirmComponent } from './pages/sign-up-confirm/sign-up-confirm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RefundComponent } from './pages/refund/refund.component';


const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'profile',
    component:ProfileComponent
  },
  {
    path:'donation-types',
    component:DonationTypesComponent
  },
  {
    path:'sign-up-confirm',
    component:SignUpConfirmComponent
  },
  {
    path:'settings',
    component:SettingsComponent
  },
  {
    path:'refund',
    component:RefundComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

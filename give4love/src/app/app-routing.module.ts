import { DonacionComponent } from './pages/donacion/donacion.component';
import { DonantesComponent } from './pages/donantes/donantes.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpConfirmComponent } from './pages/sign-up-confirm/sign-up-confirm.component';
import { PayComponent } from './pages/pay/pay.component';
import { ConfigAccountComponent } from './pages/config-account/config-account.component';


const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'sign-up/:idPartner',
    component:SignUpComponent
  },
  {
    path:'sign-up',
    component:SignUpComponent
  },
  {
    path:'sign-up-confirm',
    component:SignUpConfirmComponent
  },
  {
    path:'my-profile',
    component:DonantesComponent
  },
  {
    path:'amount-donation/:idPartner',
    component:DonacionComponent
  },
  {
    path:'pay/:idPartner',
    component:PayComponent
  },
  {
    path:'config-account',
    component:ConfigAccountComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

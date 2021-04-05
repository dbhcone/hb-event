import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FourZeroFourComponent } from './components/shared/four-zero-four/four-zero-four.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {component: HomeComponent, path: ''},
  {component: AboutComponent, path: 'about'},
  {component: ContactComponent, path: 'contact-us'},
  {component: LoginComponent, path: 'login'},
  {component: SignupComponent, path: 'signup'},
  {component: FourZeroFourComponent, path: '404'},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

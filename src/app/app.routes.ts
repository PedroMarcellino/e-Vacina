import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
   },

   {
      path: 'home',
         loadComponent: () =>
            import ('./pages/home/home.component').then((c) => c.HomeComponent)
   },

     {
      path: 'login',
         loadComponent: () =>
            import ('./logged/login/login.component').then((c) => c.LoginComponent)
   },

     {
      path: 'register',
         loadComponent: () =>
            import ('./logged/register/register.component').then((c) => c.RegisterComponent)
   },


];

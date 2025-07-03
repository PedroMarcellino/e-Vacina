import { Routes } from '@angular/router';
import path from 'path';

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


];

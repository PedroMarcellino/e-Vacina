import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';


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

    {
      path: 'forgot-my-password',
         loadComponent: () =>
            import ('./logged/forgot-my-password/forgot-my-password.component').then((c) => c.ForgotMyPasswordComponent)
   },



   {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../shared/header/sidemenu/sidemenu.component').then((c) => c.SidemenuComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
  path: 'my-vaccines',
  loadComponent: () =>
    import('./dashboard/my-vaccines/my-vaccines.component').then((c) => c.MyVaccinesComponent)
}
    ]
   }


];

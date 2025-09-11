import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoggedComponent } from './pages/no-logged/logged/logged.component';


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
            import ('./auth/login/login.component').then((c) => c.LoginComponent)
   },

     {
      path: 'register',
         loadComponent: () =>
            import ('./auth/register/register.component').then((c) => c.RegisterComponent)
   },

    {
      path: 'forgot-my-password',
         loadComponent: () =>
            import ('./auth/forgot-my-password/forgot-my-password.component').then((c) => c.ForgotMyPasswordComponent)
   },

   {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
   ]
   },

   {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-vaccines',
        loadComponent: () =>
          import('./dashboard/my-vaccines/my-vaccines.component').then(
            (c) => c.MyVaccinesComponent
          ),
      },
   ]
   },

    {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'about-vaccines',
        loadComponent: () =>
          import('./dashboard/about-vaccines/about-vaccines.component').then(
            (c) => c.AboutVaccinesComponent
          ),
      },
   ]
   },

   {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'leads',
        loadComponent: () =>
          import('./dashboard/leads/leads.component').then(
            (c) => c.LeadsComponent
          ),
      },
   ]
   },

   {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'family',
        loadComponent: () =>
          import('./dashboard/family/family.component').then(
            (c) => c.FamilyComponent
          ),
      },
   ]
   },

    {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'agenda',
        loadComponent: () =>
          import('./dashboard/agenda/agenda.component').then(
            (c) => c.AgendaComponent
          ),
      },
   ]
   },

    {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./dashboard/my-profile/my-profile.component').then(
            (c) => c.MyProfileComponent
          ),
      },
   ]
   }





];

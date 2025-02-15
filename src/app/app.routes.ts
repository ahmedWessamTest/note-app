import { Routes } from '@angular/router';
import { AuthComponent } from './core/layout/auth/auth.component';
import { UserComponent } from './core/layout/user/user.component';
import { HomeComponent } from './core/pages/home/home.component';
import { RegiserComponent } from './core/pages/regiser/regiser.component';
import { LoginComponent } from './core/pages/login/login.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegiserComponent, title: 'register' }
    ]
  },
  {
    path: '', component: UserComponent, canActivate: [authGuard], children: [
      { path: 'home', component: HomeComponent, title: 'home' },
    ]
  },
  { path: '**', component: NotFoundComponent, title: 'notFound' }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//Les différentes routes qui menent pour chaque component
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent, 
  },
  {
    path: 'login',
    component: LoginComponent, 
  },
  {
    path: 'profil',
    component: UsersComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

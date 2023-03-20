import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { LogsComponent } from './logs/logs.component';
import { LogsDetailComponent } from './logs-detail/logs-detail.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: UsersRegisterComponent},
  { path: 'users/edit/:id', component: UsersRegisterComponent},
  { path: 'users/:id', component: UsersDetailComponent},
  { path: 'logs', component: LogsComponent },
  { path: 'logs/:id', component: LogsDetailComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

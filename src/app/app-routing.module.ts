import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdsectComponent } from './components/usertable/usertable.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardService } from './guards/guard.service';
import { LoginComponent } from './auth/login/login.component';
import { AdminPermissionGuard } from './guards/admin_permission.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
  {path: 'adminsection', component: AdsectComponent, canActivate: [GuardService, AdminPermissionGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

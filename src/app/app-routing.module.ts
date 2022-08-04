import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsectComponent } from './adsect/adsect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';
import { OnlyAdminGuard } from './onlyadmin.guard';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardService]},
  {path: 'adminsection', component: AdsectComponent, canActivate: [GuardService, OnlyAdminGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

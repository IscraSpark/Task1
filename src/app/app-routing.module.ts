import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsectComponent } from './components/adsect/adsect.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuardService } from './guards/guard.service';
import { LoginComponent } from './components/login/login.component';
import { OnlyAdminGuard } from './guards/onlyadmin.guard';
import { ReportComponent } from './components/report/report.component';

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

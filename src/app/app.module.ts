import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialExampleModule } from '../material.module';
import { NavigateComponent } from './components/header/header.component';
import { ReportComponent } from './components/chartreport/chartreport.component';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { AdsectComponent } from './components/usertable/usertable.component';
import { userReducer } from './app-store';
import { environment } from '../environments/environment';
import { AppEffects } from './app-store/app.effects';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigateComponent,
    ReportComponent,
    AdsectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    NgChartsModule,
    StoreModule.forRoot({
      reducers: userReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

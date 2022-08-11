import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, mergeMap, map, of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ReportService } from '../services/getreport.service';
import {
  IUser,
  IUserReports,
  IReportData,
  IUserForAdmin,
} from '../models/interfaces';
import {
  loginUser,
  loginUserSuccess,
  getReport,
  getReportSuccess,
  getReportFailure,
  getReportData,
  getReportDataSuccess,
  getReportDataFailure,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} from './app.actions';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private reportService: ReportService,
    private route: Router,
    private lsService: LocalstorageService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        this.auth.login(action.userdata).pipe(
          map((user: IUser) => {
            this.route.navigateByUrl('/dashboard');
            this.lsService.setUser(user);
            return loginUserSuccess({ user });
          })
        )
      )
    )
  );

  getReportData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getReportData),
      mergeMap((action) =>
        this.reportService.getReportData(action.id).pipe(
          map((reportData: IReportData) => getReportDataSuccess({ reportData })),
          catchError(() => of(getReportDataFailure))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.reportService.getUser().pipe(
          map((user: IUserForAdmin) => getUsersSuccess({ user })),
          catchError(() => of(getUsersFailure))
        )
      )
    )
  );

  getReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getReport),
      switchMap(() =>
        this.reportService.getReport().pipe(
          map((report: IUserReports[]) => getReportSuccess({ report })),
          catchError(() => of(getReportFailure))
        )
      )
    )
  );
}

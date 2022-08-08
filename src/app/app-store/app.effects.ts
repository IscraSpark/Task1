import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, mergeMap, map, of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { GetreportService } from '../services/getreport.service';
import {
  User,
  UserReports,
  ReportData,
  UserForAdmin,
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
    private getrepo: GetreportService,
    private route: Router,
    private lsserv: LocalstorageService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        this.auth.login(action.userdata).pipe(
          map((user: User) => {
            this.route.navigateByUrl('/dashboard');
            this.lsserv.setUser(user);
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
        this.getrepo.getReportData(action.id).pipe(
          map((reportData: ReportData) => getReportDataSuccess({ reportData })),
          catchError(() => of(getReportDataFailure))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(() =>
        this.getrepo.getUser().pipe(
          map((user: UserForAdmin) => getUsersSuccess({ user })),
          catchError(() => of(getUsersFailure))
        )
      )
    )
  );

  getReports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getReport),
      switchMap(() =>
        this.getrepo.getReport().pipe(
          map((repo: UserReports[]) => getReportSuccess({ repo })),
          catchError(() => of(getReportFailure))
        )
      )
    )
  );
}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, observable, Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { GetrepoService } from '../getrepo.service';
import { UserReports } from '../interfaces';
import { Store } from '@ngrx/store'
import { getReport } from '../reducers/app.actions';
import { StateUser, userInfoSelectors } from '../reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  sub: Subscription[] = [];
  ELEMENT_DATA: UserReports[] = [];
  dataSource = this.ELEMENT_DATA;
  ELEMENT_DATA$!: Observable<UserReports[]>;
  constructor(
    private getrep: GetrepoService,
    private router: Router,
    private store: Store<StateUser>,
    ) {}
  ngOnInit(): void {
    // this.sub.push(
    //   this.getrep
    //     .getReport() // get data for table
    //     .pipe(catchError((err) => err))
    //     .subscribe((reports) => {
    //       this.ELEMENT_DATA = reports as UserReports[];
    //     })
    // );
    this.store.dispatch(getReport())
    this.ELEMENT_DATA$ = this.store.select(userInfoSelectors.selectUserReports);
    

  }

  columnsToDisplay: string[] = ['id', 'name', 'users_resolved', 'active'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: UserReports | null;

  gotorepo(
    row: UserReports // open report
  ) {
    let id: number = row.id;
    this.router.navigateByUrl('/report/' + id);
  }

  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }
}

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
import { GetrepoService } from '../../services/getrepo.service';
import { Columns, UserReports } from '../../interfaces';
import { Store } from '@ngrx/store'
import { getReport } from '../../reducers/app.actions';
import { StateUser, userInfoSelectors } from '../../reducers';

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
  columnsToDisplay: Columns[] = [
    {name:'No', key: 'id'}, 
    {name:'Name', key:'name'}, 
    {name:'User resolved', key:'users_resolved'},
    {name:'Active status', key: 'active'}
  ];
  columsName: string[] = [];
  columnsToDisplayWithExpand: any;
  expandedElement!: UserReports | null;


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
    for (let item of this.columnsToDisplay)
    {
      this.columsName.push(item.key)
    }
    this.columnsToDisplayWithExpand = [...this.columsName, 'expand']
    this.store.dispatch(getReport())
    this.ELEMENT_DATA$ = this.store.select(userInfoSelectors.selectUserReports);
    
  }

  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }

  

  gotorepo(
    row: UserReports // open report
  ) {
    let id: number = row.id;
    this.router.navigateByUrl('/report/' + id);
  }


}

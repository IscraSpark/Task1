import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';

import { Columns, UserReports } from '../../models/interfaces';
import { getReport } from '../../app-store/app.actions';
import { StateUser, userInfoSelectors } from '../../app-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
  elementData$!: Observable<UserReports[]>;
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
    private router: Router,
    private store: Store<StateUser>,
    ) {}

  ngOnInit(): void {
    for (let item of this.columnsToDisplay)
    {
      this.columsName.push(item.key)
    }
    this.columnsToDisplayWithExpand = [...this.columsName, 'expand']
    this.store.dispatch(getReport())
    this.elementData$ = this.store.select(userInfoSelectors.selectUserReports);
    
  }
  

  gotorepo(
    row: UserReports // open report
  ) {
    let id: number = row.id;
    this.router.navigateByUrl('/report/' + id);
  }


}

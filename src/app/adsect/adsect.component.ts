import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, Subscription } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';

import { StateUser, userInfoSelectors } from '../reducers';
import { DownloadcsvService } from '../downloadcsv.service';
import { GetrepoService } from '../getrepo.service';
import { UserForAdmin } from '../interfaces';
import { getUsers, putForDownload } from '../reducers/app.actions';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-adsect',
  templateUrl: './adsect.component.html',
  styleUrls: ['./adsect.component.css'],
})
export class AdsectComponent implements OnInit {
  sub: Subscription[] = [];
  constructor(
    private getus: GetrepoService,
    
    private store: Store<StateUser>,
  ) {}

  ELEMENT_DATA$!: Observable<UserForAdmin[]>;
  displayedColumns: string[] = ['select', 'first_name', 'last_name', 'email', 'groups'];
  dataSource!: UserForAdmin[];
  selection = new SelectionModel<UserForAdmin>(true, []);
  clickedRows = new Set<UserForAdmin>();
  downloadWait: boolean = false;

  ngOnInit(): void {
    // this.sub.push(
    //   this.getus
    //     .getUser()
    //     .pipe(catchError((err) => err))
    //     .subscribe((users) => {
    //       this.ELEMENT_DATA = users as UserForAdmin[];
    //     })
    // );
    
    this.store.dispatch(getUsers())
    this.ELEMENT_DATA$ = this.store.select(userInfoSelectors.selectUserForAdmin);
    this.ELEMENT_DATA$.subscribe(user => this.dataSource = user)
  }
  
  getUser(row: UserForAdmin) {
    if (!this.clickedRows.has(row)) {
      // mark choused
      this.clickedRows.add(row);
      this.selection.toggle(row);
      this.downloadWait = true;
      this.sendToState();
      //console.log(row);
      return;
    } else {
      this.clickedRows.delete(row); 
      this.selection.toggle(row);
      if (this.selection.isEmpty())
      {
        this.downloadWait = false;
      }
      this.sendToState();
      return null;// delete from choused by second click
    }
  }

  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected == this.dataSource.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.clickedRows.clear();
      this.downloadWait = false;
      this.sendToState();
      return;
    }
      this.clickedRows.clear();
      this.selection.clear();
      this.dataSource.forEach(user => {
        this.clickedRows.add(user);
        this.selection.toggle(user);
      }
        )
      this.downloadWait=true;
      this.sendToState();
      //console.log(this.clickedRows);
      
    
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserForAdmin): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  sendToState(){
    let rows: UserForAdmin[] = [];
    this.clickedRows.forEach(el => rows.push(el));
    let displayedColumns: string[] = this.displayedColumns;
    this.store.dispatch(putForDownload({displayedColumns, rows}));
  }

  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }
}

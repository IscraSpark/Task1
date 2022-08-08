import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { StateUser, userInfoSelectors } from '../../app-store';
import { UserForAdmin } from '../../models/interfaces';
import { getUsers, putForDownload } from '../../app-store/app.actions';

@Component({
  selector: 'app-adsect',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss'],
})
export class AdsectComponent implements OnInit {
  elementData$!: Observable<UserForAdmin[]>;
  displayedColumns: string[] = [
    'select',
    'first_name',
    'last_name',
    'email',
    'groups',
  ];
  selection = new SelectionModel<UserForAdmin>(true, []);
  clickedRows = new Set<UserForAdmin>();
  downloadWait: boolean = false; 

  constructor(private store: Store<StateUser>) {}

  

  ngOnInit(): void {

    this.store.dispatch(getUsers());
    this.elementData$ = this.store.select(userInfoSelectors.selectUserForAdmin)
  }

  getUser(row: UserForAdmin) {
    if (!this.clickedRows.has(row)) {
      // mark choosed
      this.clickedRows.add(row);
      this.selection.toggle(row);
      this.downloadWait = true;
      this.sendToState();
      return;
    } else {
      this.clickedRows.delete(row);
      this.selection.toggle(row);
      if (this.selection.isEmpty()) {
        this.downloadWait = false;
      }
      this.sendToState();
      return null; // delete from choused by second click
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(data: UserForAdmin[]) {
    if (this.isAllSelected() == data.length) {
      this.selection.clear();
      this.clickedRows.clear();
      this.downloadWait = false;
      this.sendToState();
      return;
    }
    this.clickedRows.clear();
    this.selection.clear();
    data.forEach((user: UserForAdmin) => {
      this.clickedRows.add(user);
      this.selection.toggle(user);
    });
    this.downloadWait = true;
    this.sendToState();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserForAdmin): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  sendToState() {
    let rows: UserForAdmin[] = [];
    this.clickedRows.forEach((el) => rows.push(el));
    let displayedColumns: string[] = this.displayedColumns;
    this.store.dispatch(putForDownload({ displayedColumns, rows }));
  }

}

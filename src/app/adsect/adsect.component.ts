import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, Subscription } from 'rxjs';

import { StateUser, userInfoSelectors } from '../reducers';
import { DownloadcsvService } from '../downloadcsv.service';
import { GetrepoService } from '../getrepo.service';
import { UserForAdmin } from '../interfaces';
import { getUsers } from '../reducers/app.actions';


@Component({
  selector: 'app-adsect',
  templateUrl: './adsect.component.html',
  styleUrls: ['./adsect.component.css'],
})
export class AdsectComponent implements OnInit {
  sub: Subscription[] = [];
  constructor(
    private getus: GetrepoService,
    private downl: DownloadcsvService,
    private store: Store<StateUser>,
  ) {}

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
    this.ELEMENT_DATA$ = this.store.select(userInfoSelectors.selectUserForAdmin)

  }
  ELEMENT_DATA$!: Observable<UserForAdmin[]>;
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'groups'];

  clickedRows = new Set<UserForAdmin>();

  getUser(row: UserForAdmin) {
    if (!this.clickedRows.has(row)) {
      // mark choused
      this.clickedRows.add(row);
    } else {
      this.clickedRows.delete(row); // delete from choused by second click
    }
  }

  download() {
    let row: UserForAdmin[] = [];
    this.clickedRows.forEach((item) => row.push(item));
    this.downl.save(this.displayedColumns, row);
  }

  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }
}

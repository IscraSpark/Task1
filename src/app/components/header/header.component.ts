import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DownloadcsvService } from '../../services/downloadcsv.service';
import { IUserForAdmin } from '../../models/interfaces';
import { LocalstorageService } from '../../services/localstorage.service';
import { selectDataToDownload } from 'src/app/app-store/app.selectors';
import { StateUser } from 'src/app/app-store/app.reducer';

@Component({
  selector: 'app-navigate',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class NavigateComponent implements OnInit {
  constructor(
    private router: Router,
    private lsService: LocalstorageService,
    private downlService: DownloadcsvService,
    private store: Store<StateUser>
  ) {}
  
  @Input() downloadWait!: boolean;
  role!: string;
  hide: boolean = false;
  visible: boolean = true;

  ngOnInit(): void {
    this.role = this.lsService.getUserRole();

    if (this.role == 'Admin') {
      this.hide = true;
    }
    if (this.router.url == '/dashboard') {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  logout() {
    this.lsService.removeUser();
    this.router.navigateByUrl('/login');
  }

  goToAdminPannel() {
    this.router.navigateByUrl('/adminsection');
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  download() {
    let displayedColumns: string[] = [];
    let row: IUserForAdmin[] = [];
    let data$ = this.store.select(selectDataToDownload);
    data$.subscribe((data) => {
      row = data.rows;
      displayedColumns = data.columns;
    });
    displayedColumns = displayedColumns.filter((el) => !(el == 'select'));
    this.downlService.save(displayedColumns, row);
  }
  
}

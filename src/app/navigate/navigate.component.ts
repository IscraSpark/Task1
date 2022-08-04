import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DownloadcsvService } from '../downloadcsv.service';
import { UserForAdmin } from '../interfaces';
import { LocalstorageService } from '../localstorage.service';
import { StateUser, userInfoSelectors } from '../reducers';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css'],
})
export class NavigateComponent implements OnInit {
  constructor(
    private router: Router,
    private lsserv: LocalstorageService, 
    private downl: DownloadcsvService,
    private store: Store<StateUser>
    ) {}
  @Input() downloadWait!:boolean;
  role!: string;
  hide: boolean = false;
  visible: boolean = true;

  ngOnInit(): void {
    this.role = this.lsserv.getUserRole();

    if (this.role == 'Admin') {
      this.hide = true;
    }
    if (this.router.url == '/dashboard')
    {
      this.visible = true;
    } else {
      this.visible = false;
    }
    
  }

  logout() {
    this.lsserv.removeUser();
    this.router.navigateByUrl('/login');
  }
  gotoapan() {
    this.router.navigateByUrl('/adminsection');
  }
  gotodash() {
    this.router.navigateByUrl('/dashboard');
  }
  download() {
    let displayedColumns: string[] = [];
    let row: UserForAdmin[] = [];
    let data$ = this.store.select(userInfoSelectors.selectDataToDownload)
    data$.subscribe(data => {
      row = data.rows;
      displayedColumns = data.columns;
    })
    displayedColumns = displayedColumns.filter(el=> !(el=='select'))
    this.downl.save(displayedColumns, row);
  }
}

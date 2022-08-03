import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css'],
})
export class NavigateComponent implements OnInit {
  constructor(private router: Router, private lsserv: LocalstorageService) {}
  role!: string;
  hide: boolean = false;

  ngOnInit(): void {
    this.role = this.lsserv.getUserRole();

    if (this.role == 'Admin') {
      this.hide = true;
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
}

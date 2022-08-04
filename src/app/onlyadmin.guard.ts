import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {

  constructor(private lsService: LocalstorageService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = this.lsService.getUserRole();
    if (role == 'Admin'){
      
    return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      alert('only for admins');
      return false;
    }
  }
  
}

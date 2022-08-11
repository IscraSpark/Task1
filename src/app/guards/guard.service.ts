import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let user = JSON.parse(localStorage.getItem('user') as string)
    if (user){
      if (!user.token) {
        
        this.router.navigateByUrl('/login');
        alert('you need to login');
        return false;
      } else {
        return true;
      }
  } else {
    this.router.navigateByUrl('/login');
        alert('you need to login');
        return false;
  }
  }
}

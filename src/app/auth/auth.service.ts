import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser, IUserInf } from '../models/interfaces';
import { envinronment } from '../envinronments/envinronments';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: IUserInf): Observable<IUser>{
    return this.http.post<IUser>(envinronment.loginUrl, user)
  }

}

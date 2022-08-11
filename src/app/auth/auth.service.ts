import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserInf } from '../models/interfaces';
import { envinronment } from '../envinronments/envinronments';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserInf): Observable<User>{
    return this.http.post<User>(envinronment.loginUrl, user)
  }

}
